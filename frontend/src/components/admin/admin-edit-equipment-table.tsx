import React,{ useEffect, useState } from 'react';
import { Button, Table, Form, Input } from "antd";
import { itemService, Item } from '../../api/itemService'; 

const EditEquipment: React.FC = () => {
  const [dataSource, setDataSource] = useState<Item[]>([]); 
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [form] = Form.useForm();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await itemService.getAll(); 
        setDataSource(data); 
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: '물품명',
      dataIndex: 'name',
      render: (text: string, record: Item) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: '설명',
      dataIndex: 'description',
      render: (text: string, record: Item) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="description">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      render: (text: number, record: Item) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="quantity">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: '위치',
      dataIndex: 'location',
      render: (text: string, record: Item) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="location">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: '편집하기',
      render: (_: any, record: Item) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.id);
                form.setFieldsValue({
                  name: record.name,
                  description: record.description,
                  quantity: record.quantity,
                  location: record.location,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];

  const onFinish = async (values: Partial<Item>) => {
    if (editingRow) {
      try {
        await itemService.partialUpdate(editingRow, values); 
        const updatedDataSource = [...dataSource];
        const index = updatedDataSource.findIndex((item) => item.id === editingRow);
        updatedDataSource[index] = { ...updatedDataSource[index], ...values };
        setDataSource(updatedDataSource);
        setEditingRow(null);
      } catch (error) {
        console.error("Failed to update item:", error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource} rowKey="id"></Table>
        </Form>
      </header>
    </div>
  );
};

export default EditEquipment;