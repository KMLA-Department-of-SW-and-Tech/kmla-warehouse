import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout, message, Button } from 'antd';
import Sidebar from '../../../components/sidebar/user-sidebar.tsx';
import { itemService } from "../../../../js/api/itemService.ts";
import Headbar from "../../../components/header/header.tsx";
import { UnorderedListOutlined } from '@ant-design/icons';

import { GetLog } from "../../../../js/types/Log.ts";
import { GetItem } from "../../../../js/types/Item.ts";
import { useAuth } from "../../../contexts/authContext/index.jsx";
import './user-reservation.css';

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function ReservationStatus() {
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  
  const [reservationList, setReservationList] = useState<(GetLog & { item?: GetItem })[]>([]);

  const authValue = useAuth();

  useEffect(() => {
    const fetchReservationAndEquipment = async () => {
      try {
        const username = authValue?.user?.username;
        if (!username) return;
        setCurrentUserId(username);

        const reservations = await itemService.getReservations(username, authValue.accessToken);
        setReservationList(reservations);
      } catch (error) {
        console.error("Failed to fetch:", error);
        message.error("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservationAndEquipment();
  }, [authValue.accessToken]);

  const handleReturn = async (reservationId: string) => {
    try {
      await itemService.returnItem(reservationId, authValue.accessToken);
      message.success('반납 요청이 성공적으로 처리되었습니다.');
      setReservationList(prevList => prevList.filter(r => r._id !== reservationId));
    } catch (error) {
      console.error('Failed to return item:', error);
      message.error('반납 요청에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <Layout>
      <Headbar />
      <Sider>
        <Sidebar />
      </Sider>

      <Layout className="equipment-layout">
        <Content className="equipment-content">
          <Title level={2} className="equipment-title">
            <UnorderedListOutlined />
            예약현황 보기
          </Title>

          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} className="equipment-row">
              {reservationList.length > 0 ? (
                reservationList.map((reservation) => (
                  <Col xs={24} sm={12} md={8} lg={4} key={reservation._id || Math.random()}>
                    <Card
                      hoverable
                      cover={
                        <div className="equipment-image-container">
                          {reservation.item?.imageUrl ? (
                            <img
                              src={reservation.item.imageUrl}
                              alt={reservation.item.name}
                              className="equipment-image"
                            />
                          ) : (
                            <Typography.Text className="noImageText">이미지 없음</Typography.Text>
                          )}
                        </div>
                      }
                      className="equipment-card"
                    >
                      <Card.Meta
                        title={reservation.item?.name || "이름 없음"}
                        description={
                          <>
                            <span>{reservation.quantity}</span>
                            <span> / {reservation.item?.location || "위치 정보 없음"} / {reservation.timestamp ? new Date(reservation.timestamp).toLocaleDateString() : "날짜 없음"}</span>
                          </>
                        }
                        className="equipment-meta"
                      />

                      <Button
                        type="primary"
                        onClick={() => handleReturn(reservation._id)}
                        className="returnButton"
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
