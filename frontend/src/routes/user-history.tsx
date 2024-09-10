
import { useEffect, useState } from 'react'
import { Typography, Table, Row, Col, Card } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [user, setUser] = useState<Model.User | null>(null)

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, {
        includes: [
          'reservations',
          'borrowingHistorys',
          'reservations.equipment',
          'borrowingHistorys.equipment',
        ],
      })
        .then(setUser)
        .catch(error => {
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' })
        })
    }
  }, [userId])

  const borrowingHistoryColumns = [
    {
      title: 'Equipment',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
    },
    {
      title: 'Borrow Date',
      dataIndex: 'borrowDate',
      key: 'borrowDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (date: string) =>
        date ? dayjs(date).format('YYYY-MM-DD') : 'Not Returned',
    },
  ]

  const reservationColumns = [
    {
      title: 'Equipment',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'approved' ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>My Borrowing History</Title>
          <Paragraph>
            Here you can see all the equipment you have borrowed in the past.
          </Paragraph>
          <Card>
            <Table
              dataSource={user?.borrowingHistorys || []}
              columns={borrowingHistoryColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Title level={2}>My Current Reservations</Title>
          <Paragraph>
            Here you can see the status of your current reservations.
          </Paragraph>
          <Card>
            <Table
              dataSource={user?.reservations || []}
              columns={reservationColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
