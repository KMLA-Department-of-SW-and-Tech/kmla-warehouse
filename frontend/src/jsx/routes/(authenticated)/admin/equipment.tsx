import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin, message, ConfigProvider, Upload, Button, Form, Input, InputNumber } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/admin/admin-sidebar";
import './admin.css';
import Headbar from "../../../components/admin/admin-header";
import { itemService } from "../../../../js/api/itemService";
import AddItem from '../../../../types/AddItem';
import Item from '../../../../types/Item';

const { Sider, Content } = Layout;
const { Title } = Typography;


const AdminEquipmentPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItem();
  }, []);

  // reload the items
  const fetchItem = async () => {
    setLoading(true);
    try {
      const response = await itemService.getAll(); 
      const filteredItems = response.filter((item: Item) => item.status !== "deleted");
      setItems(filteredItems);
    } catch (error) {
      message.error('Failed to fetch items');
      console.error(error);
      throw(error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    return false;
  };

  
  const handleAddItem = async (newItem: AddItem) => {    
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("description", newItem.description);
    formData.append("quantity", newItem.quantity.toString());
    formData.append("location", newItem.location);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const addedItem = await itemService.create(formData); 
      setItems(prevItems => [addedItem, ...prevItems]); 
      message.success('Item added successfully');
      form.resetFields();
    } catch (error) {
      message.error('Failed to add item');
      console.error(error);
      throw(error);
    }
  };

  const handleUpdateItem = async (id: string, updatedItem: Item) => {
    const formData = new FormData();
    formData.append('name', updatedItem.name);
    formData.append('description', updatedItem.description);
    formData.append('quantity', updatedItem.quantity.toString());
    formData.append('location', updatedItem.location);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const updated = await itemService.update(id, formData); 
      setItems(items.map(item => (item._id === id ? updated : item))); 
      message.success('Item updated successfully');
      fetchItem();
    } catch (error) {
      message.error('Failed to update item');
      console.error(error);
      throw(error);
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
      throw(error);
    }
  };


  const columns: ProColumns<Item>[] = [
    {
      title: '사진',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => (
        text ? (
          <img src={String(text)} alt="img" style={{ width: 50, height: 50, objectFit: 'cover' }} />
        ) : (
          <span>No image</span>
        )
      ),
      renderFormItem: (_, { isEditable }) => {
        if (!isEditable) return null;
  
        return (
          <Upload
            name="image"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              const formData = new FormData();
              formData.append("image", file);
              return false; 
            }}
          >
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
        );
      },
    },
    { title: '물품명', dataIndex: 'name', key: 'name' },
    { title: '설명', dataIndex: 'description', key: 'description' },
    { title: '총수량', dataIndex: 'totalQuantity', key: 'totalQuantity' },
    { title: '위치', dataIndex: 'location', key: 'location' },
    {
      title: 'Actions',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button
          key="editable"
          icon={<EditOutlined />}
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
          type="link"
        >
        </Button>,
        <Button
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteItem(record._id)}
        type="link"
        danger
      >
      </Button>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <Layout className="layout">
        <Headbar />
        <Layout>
          <Sider>
            <Sidebar />
          </Sider>
          <Layout>
            <Content className="content">
              <Title level={3}>물품관리</Title>

              <Form
                form={form}
                layout="inline"
                onFinish={handleAddItem}
                style={{ marginBottom: '16px' }}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input the item name!' }]}
                >
                  <Input placeholder="Item Name" />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: 'Please input the description!' }]}
                >
                  <Input placeholder="Description" />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true, message: 'Please input the quantity!' }]}
                >
                  <InputNumber min={1} placeholder="Quantity" />
                </Form.Item>
                <Form.Item
                  name="location"
                  rules={[{ required: true, message: 'Please input the location!' }]}
                >
                  <Input placeholder="Location" />
                </Form.Item>
                <Form.Item name="imageUrl">
                  <Upload
                    name="image"
                    listType="picture"
                    showUploadList={true}
                    beforeUpload={handleImageUpload}
                  >
                    <Button icon={<UploadOutlined />}>이미지 업로드</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Item
                  </Button>
                </Form.Item>
              </Form>

              {loading ? (
                <Spin />
              ) : (
                // properties in editable state on each row cell
                <EditableProTable<Item>
                  rowKey="_id"
                  value={items}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data) => {
                      await handleUpdateItem(data._id, data as Item);
                      setEditableRowKeys((prevKeys) => prevKeys.filter((key) => key !== rowKey));
                    },
                    onChange: setEditableRowKeys,
                    saveText: <Button icon={<SaveOutlined/>}></Button>,
                    cancelText: <Button icon={<CloseOutlined/>}></Button>,
                    actionRender: (row, config, defaultDom) => {
                      const { save, cancel } = defaultDom; 
                      return [save, cancel];
                    },
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

export default AdminEquipmentPage;
