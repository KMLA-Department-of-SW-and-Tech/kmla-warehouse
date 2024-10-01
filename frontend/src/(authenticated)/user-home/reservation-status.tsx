import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout, message } from 'antd';
import { LoginOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Sidebar from '../../components/equipment/equipment-bar';
import { teamService } from "../../api/teamService.ts";
import { itemService } from "../../api/itemService.ts";
import { useNavigate } from "react-router-dom";
import Headbar from "../../components/header.tsx";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Item {
  _id: string;
  name: string;
  location: string;
  photoUrl?: string;
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
        // Get current user information
        const userInfo = await teamService.getUserInfo();
        console.log('Fetched user info:', userInfo);
        setCurrentUserId(userInfo);
        
        // Fetch reservation list
        const reservations = await itemService.getReservations(userInfo._id);
        console.log('Fetched reservations:', reservations);
        setReservationList(reservations);
      } catch (error) {
        console.log("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationAndEquipment();
  }, []);

  // 반납 처리 핸들러
  const handleReturn = async (reservationId: string) => {
    if (!reservationId) return;
    try {
      await itemService.returnItem(reservationId);
      message.success('반납 요청이 성공적으로 처리되었습니다.');

      // 페이지 리로드하여 상태를 갱신
      window.location.reload();
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
                          {reservation.item.photoUrl ? (
                            <img
                              src={reservation.item.photoUrl}
                              alt={reservation.item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Typography.Text>이미지 없음</Typography.Text>
                          )}
                        </div>
                      }
                      actions={[
                        <LoginOutlined
                          key="return"
                          onClick={() => handleReturn(reservation._id)} // 반납 요청 핸들러 호출
                        />,
                      ]}
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
