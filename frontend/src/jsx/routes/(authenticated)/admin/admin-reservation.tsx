import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, message, Grid, ConfigProvider, Select, Button } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from '../../../components/sidebar/admin-sidebar';
import "./admin.css";
import Headbar from "../../../components/header/admin-header.tsx";
import logService from "../../../../js/api/logService";
import { GetLog, PatchLog } from "../../../../js/types/Log";
import enUS from 'antd/lib/locale/en_US';
import { useAuth } from '../../../contexts/authContext';

const { Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;
const { Option } = Select;



const AdminReservationPage: React.FC = () => {
  const screens = useBreakpoint();
  const [logs, setLogs] = useState<GetLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<GetLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const authValue = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [selectedFilter, logs]);


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

  const applyFilter = () => {
    if (selectedFilter === "all") {
      setFilteredLogs(logs);
    } else {
      setFilteredLogs(logs.filter((log) => log.type === selectedFilter));
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


  const columns: ProColumns<GetLog>[] = [
    { title: "팀명", dataIndex: "user", key: "user" },
    { title: "신청물품", dataIndex: "item", key: "item" },
    { title: "수량", dataIndex: "quantity", key: "quantity" },
    { title: "상태", dataIndex: "type", key: "type" },
    { title: "시간", dataIndex: "timestamp", key: "timestamp" },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <Layout>
        <Headbar />
        <Layout>          
          <Layout className="admin-layout">
            <Sider className='sidebar'>
              <Sidebar />
            </Sider>
            <Content className="admin-content">
              <Title level={3}>신청관리</Title>
              <Button.Group className='admin-table'>
                <Button 
                  type={selectedFilter === "all"  ? "primary" : "default"} 
                  onClick={() => setSelectedFilter("all")}
                >
                  전체
                </Button>
                <Button 
                  type={selectedFilter === "borrow" ? "primary" : "default"} 
                  onClick={() => setSelectedFilter("borrow")}
                >
                  대여 중
                </Button>
                <Button 
                  type={selectedFilter === "return" ? "primary" : "default"} 
                  onClick={() => setSelectedFilter("return")}
                >
                  반납됨
                </Button>
              </Button.Group>
              {loading ? (
                <Spin />
              ) : (
                <EditableProTable<GetLog>
                  rowKey="_id"
                  value={filteredLogs}
                  columns={columns}
                  editable={{
                    type: "multiple",
                    editableKeys,
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={false}
                  className='admin-reservation-table'
                />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
    
  );
};

export default AdminReservationPage;
