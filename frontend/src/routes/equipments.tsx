import { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  DatePicker,
  Form,
  Spin,
  Row,
  Col,
  Card,
  Image,
} from 'antd'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useAuthentication } from '@web/modules/authentication'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EquipmentDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [equipment, setEquipment] = useState<Model.Equipment | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await Api.Equipment.findOne(params.equipmentId, {
          includes: ['reservations'],
        })
        setEquipment(equipmentData)
      } catch (error) {
        enqueueSnackbar('Failed to load equipment details', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [params.equipmentId])

  const handleReservationSubmit = async (values: any) => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to make a reservation', {
        variant: 'error',
      })
      return
    }

    const { reservationTime } = values
    const [startTime, endTime] = reservationTime

    try {
      await Api.Reservation.createOneByUserId(userId, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'pending',
        equipmentId: equipment?.id,
      })
      enqueueSnackbar('Reservation request submitted successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to submit reservation request', {
        variant: 'error',
      })
    }
  }

  if (loading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={16}>
          <Card>
            <Row>
              {/* Image Section */}
              <Col span={12}>
                <Image
                  src="/path-to-placeholder-image" // Replace with actual image path
                  alt="Equipment Image"
                  width="100%"
                  height="auto"
                  preview={false}
                />
              </Col>

              {/* Details Section */}
              <Col span={12} style={{ paddingLeft: '20px' }}>
                <Title level={2}>{equipment?.name}</Title>
                <Text>예약자 {equipment?.reservations?.length || 0}명</Text>
                <ul>
                  <li>브레드 보드</li>
                  <li>구리선</li>
                  <li>소리센서</li>
                </ul>

                {/* Reservation Form */}
                <Form onFinish={handleReservationSubmit}>
                  <Form.Item
                    name="reservationTime"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a reservation time',
                      },
                    ]}
                  >
                    <RangePicker showTime />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                    >
                      예약하기
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
