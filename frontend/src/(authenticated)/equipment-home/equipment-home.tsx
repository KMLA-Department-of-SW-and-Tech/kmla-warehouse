import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Spin } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { PageLayout } from '../../layouts/page-layout.tsx';
import { itemService, Item } from '../../api/itemService';

const { Title } = Typography;

export default function EquipmentListPage() {
  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const items = await itemService.getAll();
        setEquipmentList(items);
      } catch (error) {
        console.error('Failed to fetch equipment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleViewDetails = (equipmentId: string) => {
    // 상세 페이지로 이동하는 로직을 여기에 추가하세요
    console.log('View details for equipment:', equipmentId);
  };

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Available Equipment</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {equipmentList?.map(equipment => (
            <Col xs={24} sm={12} md={8} lg={6} key={equipment.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={equipment.name}
                    src={equipment.photoUrl || '/default-equipment.jpg'}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  <CalendarOutlined
                    key="view"
                    onClick={() => handleViewDetails(equipment.id)}
                  />,
                ]}
                style={{ width: '100%', height: '300px' }}
              >
                <Card.Meta
                  title={equipment.name}
                  description={equipment.location}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  );
}
