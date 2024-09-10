'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Form,
  Input,
  Button,
  Upload,
  Table,
  Space,
  Popconfirm,
  Select,
} from 'antd'
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '../layouts/page-layout'
import React from 'react'

export default function EquipmentManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [equipments, setEquipments] = useState<Model.Equipment[]>([])
  const [editingEquipment, setEditingEquipment] =
    useState<Model.Equipment | null>(null)
  const [fileList, setFileList] = useState<any[]>([])

  const fetchEquipments = async () => {
    try {
      const data = await Api.Equipment.findMany()
      setEquipments(data)
    } catch (error) {
      enqueueSnackbar('Failed to fetch equipments', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchEquipments()
  }, [])

  const handleUpload = async (options: any) => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList([{ url, status: 'done' }])
  }

  const handleFinish = async (values: any) => {
    try {
      const equipmentData = {
        ...values,
        photoUrl: fileList[0]?.url,
      }
      if (editingEquipment) {
        await Api.Equipment.updateOne(editingEquipment.id, equipmentData)
        enqueueSnackbar('Equipment updated successfully', {
          variant: 'success',
        })
      } else {
        await Api.Equipment.createOne(equipmentData)
        enqueueSnackbar('Equipment created successfully', {
          variant: 'success',
        })
      }
      fetchEquipments()
      setEditingEquipment(null)
      setFileList([])
    } catch (error) {
      enqueueSnackbar('Failed to save equipment', { variant: 'error' })
    }
  }

  const handleEdit = (record: Model.Equipment) => {
    setEditingEquipment(record)
    setFileList(
      record.photoUrl ? [{ url: record.photoUrl, status: 'done' }] : [],
    )
  }

  const handleDelete = async (id: string) => {
    try {
      await Api.Equipment.deleteOne(id)
      enqueueSnackbar('Equipment deleted successfully', { variant: 'success' })
      fetchEquipments()
    } catch (error) {
      enqueueSnackbar('Failed to delete equipment', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photoUrl',
      key: 'photoUrl',
      render: (text: string) => (
        <img src={text} alt="equipment" style={{ width: 50 }} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Model.Equipment) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Equipment Management</Title>
      <Text>
        Manage your equipment inventory by adding, updating, or deleting items.
      </Text>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        initialValues={
          editingEquipment || { status: 'available', location: '', quantity: 1 }
        }
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the status!' }]}
        >
          <Select>
            <Option value="available">Available</Option>
            <Option value="unavailable">Unavailable</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Photo">
          <Upload fileList={fileList} customRequest={handleUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginBottom: '16px' }}>
            {editingEquipment ? 'Update' : 'Add'} Equipment
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={equipments} columns={columns} rowKey="id" />
    </PageLayout>
  )
}
