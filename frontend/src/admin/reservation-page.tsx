import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, message } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from '../components/admin/admin-sidebar';
import "./admin-home.css";
import Headbar from "../components/header";
import { borrowHistoryService, BorrowHistory } from '../api/borrowHistoryService';

const { Content, Sider } = Layout;
const { Title } = Typography;

const AdminHistoryPage: React.FC = () => {
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
      const filteredBorrowHistories = response.filter(
        (borrowHistory) => borrowHistory.status !== "deleted"
      );
      setBorrowHistories(filteredBorrowHistories);
    } catch (error) {
      message.error("Failed to fetch items");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  const handleDeleteBorrowHistory = async (id: string) => {
    try {
      await borrowHistoryService.delete(id);
      setBorrowHistories(borrowHistories.filter((borrowHistory) => borrowHistory._id !== id));
      message.success("Borrow history deleted successfully");
    } catch (error) {
      message.error("Failed to delete borrow history");
      console.error(error);
    }
  };

  const columns: ProColumns<BorrowHistory>[] = [
    { title: "팀명", dataIndex: "user", key: "user" },
    { title: "신청물품", dataIndex: "item", key: "item" },
    { title: "수량", dataIndex: "quantity", key: "quantity" },
    { title: "상태", dataIndex: "type", key: "type" },
    { title: "시간", dataIndex: "timestamp", key: "timestamp" },
    {
      title: "Actions",
      valueType: "option",
      render: (text, record) => [
        <a key="delete" onClick={() => handleDeleteBorrowHistory(record._id)}>
          Delete
        </a>,
      ],
    },
  ];

  return (
    <Layout className="layout">
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
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
                
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;
