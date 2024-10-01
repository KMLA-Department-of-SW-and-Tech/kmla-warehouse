import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Layout, Typography, Spin, message } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import { itemService } from "../api/itemService";
//import EditEquipment from "../components/admin/admin-edit-equipment-table";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Item {
  _id: string;
  name: string;
  description: string;
  totalQuantity: number;
  availableQuantity: number;
  location: string;
  photoUrl?: string;
  tags: string[];
  status: 'available' | 'deleted';
  category: string;
}

const AdminEquipmentPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await itemService.getAll(); // 모든 아이템을 가져옴
        setItems(response);
      } catch (error) {
        message.error('Failed to fetch items');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = async (newItem: Item) => {
    try {
      const addedItem = await itemService.create(newItem); // 새 아이템을 등록
      setItems([...items, addedItem]); // 테이블에 새 아이템 추가
      message.success('Item added successfully');
    } catch (error) {
      message.error('Failed to add item');
      console.error(error);
    }
  };

  const handleUpdateItem = async (id: string, updatedItem: Item) => {
    try {
      const updated = await itemService.update(id, updatedItem); // 아이템 업데이트
      setItems(items.map(item => (item._id === id ? updated : item))); // 테이블 업데이트
      message.success('Item updated successfully');
    } catch (error) {
      message.error('Failed to update item');
      console.error(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await itemService.delete(id); // 아이템 삭제
      setItems(items.filter(item => item._id !== id)); // 삭제된 아이템을 테이블에서 제거
      message.success('Item deleted successfully');
    } catch (error) {
      message.error('Failed to delete item');
      console.error(error);
    }
  };

  const columns = [
    {
      title: '물품명',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '설명',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: '총수량',
      dataIndex: 'totalQuantity',
      editable: true,
    },
    {
      title: '사용 가능 수량',
      dataIndex: 'availableQuantity',
      editable: true,
    },
    {
      title: '위치',
      dataIndex: 'location',
      editable: true,
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (_, record, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => handleDeleteItem(record._id)} // 삭제 요청
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
            <Title level={3}>물품관리</Title>
            {loading ? (
              <Spin />
            ) : (
              <>
                <EditableProTable<Item>
                  rowKey="_id"
                  value={items}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, newData) => {
                      if (!newData._id) {
                        // 새 아이템 추가
                        await handleAddItem(newData as Item);
                      } else {
                        // 기존 아이템 업데이트
                        await handleUpdateItem(newData._id, newData as Item);
                      }
                    },
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={{
                    position: 'bottom',
                    record: () => ({
                      _id: (Math.random() * 1000000).toFixed(0),
                      name: '',
                      description: '',
                      totalQuantity: 0,
                      availableQuantity: 0,
                      location: '',
                      tags: [],
                      status: 'available',
                      category: '',
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

export default AdminEquipmentPage;
