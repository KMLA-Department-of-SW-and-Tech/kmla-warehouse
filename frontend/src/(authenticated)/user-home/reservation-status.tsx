import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout, message, Button } from 'antd';
import Sidebar from '../../components/equipment/equipment-bar';
import { teamService } from "../../api/teamService.ts";
import { itemService } from "../../api/itemService.ts";
import { useNavigate } from "react-router-dom";
import Headbar from "../../components/header.tsx";
import { UnorderedListOutlined } from '@ant-design/icons';


const { Sider, Content } = Layout;
const { Title } = Typography;

interface Item {
  _id: string;
  name: string;
  location: string;
  imageUrl?: string;
}

interface Reservation {
  _id: string;
  item: Item;
  quantity: number;
  user: object;
  timestamp: Date;
}

export default function ReservationStatus() {
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationAndEquipment = async () => {
      try {
        const userInfo = await teamService.getUserInfo();
        setCurrentUserId(userInfo._id);
        const reservations = await itemService.getReservations(userInfo._id);
        setReservationList(reservations);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationAndEquipment();
  }, []);

  const handleReturn = async (reservationId: string) => {
    if (!reservationId) return;
    try {
      await itemService.returnItem(reservationId);
      message.success('반납 요청이 성공적으로 처리되었습니다.');
      setReservationList(prevList => prevList.filter(r => r._id !== reservationId));
    } catch (error) {
      console.error('Failed to return item:', error);
      if (error.response) {
        const status = error.response.status;
        const messageText = error.response.data.message || error.message;

        if (status === 404) {
          message.error(messageText || '아이템을 찾을 수 없습니다.');
        } else if (status === 400) {
          message.error(messageText || '유효하지 않은 반납 요청입니다.');
        } else if (status === 500) {
          message.error(messageText || '서버 오류가 발생했습니다.');
        } else {
          message.error('반납 요청에 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        message.error('반납 요청에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headbar />
      <Sider
        width={250}
        style={{
          background: '#fff',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 64,
        }}
      >
        <Sidebar />
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ padding: '40px', marginTop: '64px', width: 'calc(98vw - 250px)' }}>
          <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
            <UnorderedListOutlined style={{ marginRight: '10px' }} />
            예약현황 보기
          </Title>

          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {reservationList.length > 0 ? (
                reservationList?.map((reservation) => (
                  <Col xs={24} sm={12} md={8} lg={4} key={reservation._id}>
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
                          {reservation.item.imageUrl ? (
                            <img
                              src={reservation.item.imageUrl}
                              alt={reservation.item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Typography.Text>이미지 없음</Typography.Text>
                          )}
                        </div>
                      }
                      style={{ maxWidth: '220px', height: '300px' }}
                    >
                      <Card.Meta
                        title={reservation.item.name}
                        description={`${reservation.item.location} / ${new Date(reservation.timestamp).toLocaleDateString()}`}
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      />
                      
                      <Button
                        type="primary"
                        onClick={() => handleReturn(reservation._id)}
                        style={{
                          marginTop: '10px',
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        
                        반납하기
                      </Button>
                    </Card>
                  </Col>
                ))
              ) : (
                <Typography.Text>데이터가 없습니다.</Typography.Text>
              )}
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
