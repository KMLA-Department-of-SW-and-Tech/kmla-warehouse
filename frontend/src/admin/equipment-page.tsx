//admin-equipment-page
import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin, message } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import { Item, itemService } from "../api/itemService";


const { Sider, Content } = Layout;
const { Title } = Typography;


const AdminEquipmentPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await itemService.getAll(); 
        const filteredItems = response.filter((item: Item) => item.status !== "deleted");
        setItems(filteredItems);
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
    const itemToAdd: Item ={
      _id: `${(Math.random() * 1000000).toFixed(0)}`,
      name: newItem.name,
      description: newItem.description,
      totalQuantity: newItem.totalQuantity,
      availableQuantity: newItem.totalQuantity,
      location: newItem.location,
      photoUrl: "", 
      tags: [], 
      status: "available",
      category: "", 
    }
    try {
      const addedItem = await itemService.create(itemToAdd); 
      setItems([...items, addedItem]); 
      message.success('Item added successfully');
    } catch (error) {
      message.error('Failed to add item');
      console.error(error);
    }
  };

  const handleUpdateItem = async (id: string, updatedItem: Item) => {
    try {
      const updated = await itemService.update(id, updatedItem); 
      setItems(items.map(item => (item._id === id ? updated : item))); 
      message.success('Item updated successfully');
    } catch (error) {
      message.error('Failed to update item');
      console.error(error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await itemService.delete(id); 
      setItems(items.filter(item => item._id !== id)); 
      message.success('Item deleted successfully');
    } catch (error) {
      message.error('Failed to delete item');
      console.error(error);
    }
  };

  const columns: ProColumns<Item>[] = [
    {
      title: '물품명',
      dataIndex: 'name',
      
  
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description'

    },
    {
      title: '총수량',
      dataIndex: 'totalQuantity',
      key: 'totalQauntity'

    },
    {
      title: '위치',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => { action?.startEditable?.(record._id)}}>
          Edit
        </a>,
        <a key="delete" onClick={() => handleDeleteItem(record._id)}>
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
                  rowKey="id"
                  value={items}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                      if (!data._id) {
                        data.status = "available";
                        await handleAddItem(data);
                      } else {
                        await handleUpdateItem(data._id, data as Item);
                      }
                    },
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={{
                    position: 'bottom',
                    record: () => ({
                      _id: '',
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
