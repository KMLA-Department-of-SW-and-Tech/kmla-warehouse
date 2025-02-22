import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, message, Grid, Modal } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from '../../../components/admin/admin-sidebar';
import "./admin.css";
import Headbar from "../../../components/admin/admin-header";
// import { borrowHistoryService, BorrowHistory } from '../../../api/borrowHistoryService';
import { DeleteOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const AdminHistoryPage: React.FC = () => {
  const screens = useBreakpoint();
  const [borrowHistories, setBorrowHistories] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    fetchBorrowHistories();
  }, []);


  const fetchBorrowHistories = async () => {
    setLoading(true);
    try {
      const response = await borrowHistoryService.getAll();
      const filteredBorrowHistories = response
      .filter((borrowHistory) => borrowHistory.status !== "deleted")
      .map((borrowHistory) => ({
        ...borrowHistory,
        timestamp: formatTimestamp(borrowHistory.timestamp), // 시간 형식 변환
      }));
      setBorrowHistories(filteredBorrowHistories);
    } catch (error) {
      message.error("Failed to fetch items");
      console.error(error);
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

  const handleUpdateBorrowHistory = async (id: string, updatedBorrowHistory: BorrowHistory) => {
    try {
      const updated = await borrowHistoryService.update(id, updatedBorrowHistory);
      setBorrowHistories(borrowHistories.map((bh) => (bh._id === id ? updated : bh)));
      message.success("Borrow history updated successfully");
      fetchBorrowHistories(); // 데이터 갱신
    } catch (error) {
      message.error("Failed to update borrow history");
      console.error(error);
    }
  };


  const columns: ProColumns<BorrowHistory>[] = [
    { title: "팀명", dataIndex: "user", key: "user" },
    { title: "신청물품", dataIndex: "item", key: "item" },
    { title: "수량", dataIndex: "quantity", key: "quantity" },
    { title: "상태", dataIndex: "type", key: "type" },
    { title: "시간", dataIndex: "timestamp", key: "timestamp" },
  ];

  return (
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
            <Title level={3}>예약현황</Title>
            {loading ? (
              <Spin />
            ) : (
              <EditableProTable<BorrowHistory>
                rowKey="_id"
                value={borrowHistories}
                columns={columns}
                editable={{
                  type: "multiple",
                  editableKeys,
                  onSave: async (rowKey, data) => {
                    await handleUpdateBorrowHistory(data._id, data as BorrowHistory);
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
  );
};

export default AdminHistoryPage;
