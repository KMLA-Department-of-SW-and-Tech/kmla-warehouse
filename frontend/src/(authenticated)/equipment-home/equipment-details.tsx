import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../../layouts/page-layout.tsx';
import { itemService, Item } from '../../api/itemService';

import {
  Typography,
  Button,
  Spin,
  Row,
  Col,
  Card,
  Image,
} from 'antd'
import { SendOutlined } from '@ant-design/icons'
const { Title, Text } = Typography

export default function EquipmentDetailPage() {
  const navigate = useNavigate()
  const params = useParams<any>()
  const [equipment, setEquipment] = useState<Item | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await itemService.getById(params.equipmentId)
        setEquipment(equipmentData)
      } catch (error) {
        alert('장비 상세 정보를 불러오는데 실패했습니다')
      } finally {
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [params.equipmentId])

  const handleReservationSubmit = async () => {
    if (!equipment) return;

    try {
      const updatedEquipment = await itemService.partialUpdate(equipment.id, { reserved: true })
      setEquipment(updatedEquipment)
      alert('예약 신청이 성공적으로 제출되었습니다')
    } catch (error) {
      alert('예약 신청에 실패했습니다')
    }
  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Image src={equipment?.imageUrl} alt={equipment?.name} />
        </Col>
        <Col span={12}>
          <Card>
            <Title level={2}>{equipment?.name}</Title>
            <Text>{equipment?.description}</Text>
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handleReservationSubmit}
              disabled={equipment?.reserved}
            >
              {equipment?.reserved ? '예약됨' : '예약 신청'}
            </Button>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
