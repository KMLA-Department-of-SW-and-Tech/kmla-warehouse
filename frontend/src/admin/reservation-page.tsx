//admin-reservation-page
import React, { useState, useEffect } from 'react';
import { Layout, Typography, Spin, message } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from '../components/admin/admin-sidebar';
import "../styles/admin-home.css";
import Headbar from "../components/header";
import { borrowHistoryService, BorrowHistory } from '../api/borrowHistoryService';


const { Content, Sider } = Layout;
const { Title } = Typography;


const AdminHistoryPage: React.FC = () => {
  const [borrowHistories, setBorrowHistories] = useState<BorrowHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchBorrowHistories = async () => {
      setLoading(true);
      try {
        const response = await borrowHistoryService.getAll(); 
        setBorrowHistories(response);
      } catch (error) {
        message.error('Failed to fetch items');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowHistories();
  }, []);

  const handleAddBorrowHistory = async (newBorrowHistory: BorrowHistory) => {
    try {
      const addedBorrowHistory = await borrowHistoryService.create(newBorrowHistory); 
      setBorrowHistories([...borrowHistories, addedBorrowHistory]); 
      message.success('Borrow history added successfully');
    } catch (error) {
      message.error('Failed to add borrow history');
      console.error(error);
    }
  };


  const handleDeleteBorrowHistory = async (id: string) => {
    try {
      await borrowHistoryService.delete(id); 
      setBorrowHistories(borrowHistories.filter(borrowHistory => borrowHistory._id !== id)); 
      message.success('Borrow history deleted successfully');
    } catch (error) {
      message.error('Failed to delete borrow history');
      console.error(error);
    }
  };

  const columns: ProColumns<BorrowHistory>[] = [
    {
      title: '팀명',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: '신청물품',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '상태',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '시간',
      dataIndex: "timestamp", 
      key: 'timestamp',
  
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (text, record, action) => [
        <a
          key="delete"
          onClick={() => handleDeleteBorrowHistory(record._id)} 
        >
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
              <>
                <EditableProTable<BorrowHistory>
                  rowKey="id"
                  value={borrowHistories}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        await handleAddBorrowHistory(data as BorrowHistory);
                    },
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={{
                    position: 'bottom',
                    record: () => ({
                      _id: `${(Math.random() * 1000000).toFixed(0)}`,
                      user: '',
                      item: '',
                      quantity: 0,
                      type: "borrow",
                      timestamp: '',
                    }),
                  }}
                />
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;
