import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, message, Grid, Modal, ConfigProvider } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from '../../../components/admin/admin-sidebar';
import "./admin.css";
import Headbar from "../../../components/admin/admin-header";
import { logService } from "../../../../js/api/logService";
import { GetLog, PatchLog } from "../../../../js/types/Log";
import enUS from 'antd/lib/locale/en_US';
import { useAuth } from '../../../contexts/authContext';

const { Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AdminHistoryPage: React.FC = () => {
  const screens = useBreakpoint();
  const [logs, setLogs] = useState<GetLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const authValue = useAuth();

  useEffect(() => {
    fetchLogs();
  }, []);


  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await logService.getAll(authValue.accessToken);
      const filteredLogs = response
      .filter((log) => log.status !== "deleted")
      .map((log) => ({
        ...log,
        timestamp: formatTimestamp(log.timestamp), // 시간 형식 변환
      }));
      setLogs(filteredLogs);
    } catch (error) {
      message.error("Failed to fetch items");
      console.error(error);
      throw(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
  };

  const handleUpdateLog = async (id: string, update: PatchLog) => {
    try {
      const updated = await logService.update(id, update, authValue.accessToken);
      setLogs(logs.map((bh) => (bh._id === id ? updated : bh)));
      message.success("Log updated successfully");
      fetchLogs(); // 데이터 갱신
    } catch (error) {
      message.error("Failed to update log");
      console.error(error);
      throw(error);
    }
  };


  const columns: ProColumns<GetLog>[] = [
    { title: "팀명", dataIndex: "user", key: "user" },
    { title: "신청물품", dataIndex: "item", key: "item" },
    { title: "수량", dataIndex: "quantity", key: "quantity" },
    { title: "상태", dataIndex: "type", key: "type" },
    { title: "시간", dataIndex: "timestamp", key: "timestamp" },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <Layout className="layout">
        <Headbar />
        <Layout>
          {!screens.xs  && (
            <Sider>
              <Sidebar />
            </Sider>
          )}
          
          <Layout>
            <Content className="content">
              <Title level={3}>신청관리</Title>
              {loading ? (
                <Spin />
              ) : (
                <EditableProTable<GetLog>
                  rowKey="_id"
                  value={logs}
                  columns={columns}
                  editable={{
                    type: "multiple",
                    editableKeys,
                    onSave: async (rowKey, data) => {
                      await handleUpdateLog(data._id, data as PatchLog);
                    },
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={false}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
    
  );
};

export default AdminHistoryPage;
