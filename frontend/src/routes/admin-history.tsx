'use client'

import { useEffect, useState } from 'react'
import { Table, Button, Space, Typography } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReservationManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [reservations, setReservations] = useState<Model.Reservation[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsFound = await Api.Reservation.findMany({
          includes: ['user', 'equipment'],
        })
        setReservations(reservationsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch reservations', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const handleUpdateReservation = async (
    reservationId: string,
    status: string,
  ) => {
    try {
      await Api.Reservation.updateOne(reservationId, { status })
      setReservations(prev =>
        prev.map(reservation =>
          reservation.id === reservationId
            ? { ...reservation, status }
            : reservation,
        ),
      )
      enqueueSnackbar(
        `Reservation ${status === 'approved' ? 'approved' : 'rejected'}`,
        { variant: 'success' },
      )
    } catch (error) {
      enqueueSnackbar('Failed to update reservation', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Equipment',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Model.Reservation) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleUpdateReservation(record.id, 'approved')}
            disabled={record.status === 'approved'}
          >
            Approve
          </Button>
          <Button
            type="default"
            danger
            icon={<CloseOutlined />}
            onClick={() => handleUpdateReservation(record.id, 'rejected')}
            disabled={record.status === 'rejected'}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Reservation Management</Title>
      <Text>
        As an administrator, you can approve or reject reservation requests to
        manage the availability of equipment.
      </Text>
      <Table
        columns={columns}
        dataSource={reservations}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </PageLayout>
  )
}
