import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Import the icon
import Sidebar from '../../components/equipment/equipment-bar';
import { itemService } from '../../api/itemService'; // Import the itemService
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Item {
  _id: string;
  name: string;
  status: string;
  photoUrl?: string;
}

interface Reservation {
  _id: string;
  item: string;  // item ID
  quantity: number;
  borrower: string;
}

export default function ReservationStatus({ currentUserId }: {currentUserId: string}) {
  const [loading, setLoading] = useState(true); // Start loading as true
  const [equipmentList, setEquipmentList] = useState<Item[]>([]); // Empty list initially
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationsAndItems = async () => {
      try {
        // 모든 예약 데이터를 불러옴, API에서 getReservations로 정보 받아오기
        const reservationData: Reservation[] = await itemService.getReservations();
        // 현재 사용자의 예약만 필터링
        const userReservations = reservationData.filter(
          reservation => reservation.borrower === currentUserId
        );
        setReservationList(userReservations);

        // 모든 아이템 정보를 가져옴
        const items = await itemService.getAll();
        // 아이템의 id를 _id로 변환
        const itemsWithId = items.map(item => ({
          ...item,
          _id: item.id // id를 _id로 변환
        }));
        // 예약된 아이템 ID와 매칭되는 아이템만 필터링
        const reservedItems = items.filter(item => 
          userReservations.some(reservation => reservation.item === item.id)
        );
        setEquipmentList(reservedItems);
      } catch (error) {
        console.error('Failed to fetch reservation and item data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationsAndItems();
  }, [currentUserId]);

  const handleViewDetails = (equipmentId: string) => {
    navigate(`/kmla-warehouse/item/${equipmentId}`); // Navigate to the details page
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={250}
        style={{
          background: '#fff',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
        }}
      >
        <Sidebar />
      </Sider>

      {/* Main content */}
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ padding: '40px', width: 'calc(100vw - 250px)' }}>
          
          {/* Title with icon */}
          <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
            <UnorderedListOutlined style={{ marginRight: '10px' }} />
            예약현황 보기
          </Title>
          
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {equipmentList?.map((equipment) => (
                <Col xs={24} sm={12} md={8} lg={5} key={equipment._id}>
                  <Card
                    hoverable
                    cover={
                      <div
                        style={{
                          width: '100%',
                          height: '150px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        {equipment.photoUrl ? (
                          <img
                            src={equipment.photoUrl}
                            alt={equipment.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Typography.Text>이미지 없음</Typography.Text>
                        )}
                      </div>
                    }
                    actions={[
                      <CalendarOutlined
                        key="view"
                        onClick={() => handleViewDetails(equipment._id)}
                      />,
                    ]}
                    style={{ maxWidth: '220px', height: '270px' }}
                  >
                    <Card.Meta
                      title={equipment.name}
                      description={equipment.status}
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
        </Content>
      </Layout>
    </Layout>
  );
}
