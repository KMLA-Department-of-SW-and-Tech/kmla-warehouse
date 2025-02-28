import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout, message, Button } from 'antd';
import Sidebar from '../../../components/user/user-sidebar.tsx';
// import { teamService } from "../../../../js/api/borrowHistoryService.ts"
import { itemService } from "../../../../js/api/itemService.ts";
import Headbar from "../../../components/user/header.tsx";
import { UnorderedListOutlined } from '@ant-design/icons';

import { GetLog } from "../../../../js/types/Log";
import {GetItem, PostItem, PatchItem} from "../../../../js/types/Item";
import { useAuth } from "../../../contexts/authContext/index.jsx";


const { Sider, Content } = Layout;
const { Title } = Typography;

export default function ReservationStatus() {
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  
  const [reservationList, setReservationList] = useState<GetLog[]>([]);
  const [reservationItemsList, setReservationItemsList] = useState<GetItem[]>([]);

  const authValue = useAuth();


  useEffect(() => {
    const fetchReservationAndEquipment = async () => {
      try {
        const username = "username"; //Edit after implementing login
        setCurrentUserId(username);
        const reservations = await itemService.getReservations(username, authValue.accessToken);
        setReservationList(reservations);

      } catch (error) {
        console.error("Failed to fetch:", error);
        throw(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationAndEquipment();
  }, []);

  const handleReturn = async (reservationId: string) => {
    try {
      await itemService.returnItem(reservationId, authValue.accessToken);
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

      throw(error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headbar />
      <Sider className={styles.sidebar}>
  <Sidebar />
</Sider>

<Layout className={styles.layout}>
  <Content className={styles.content}>
    <Title level={2} className={styles.title}>
      <UnorderedListOutlined style={{ marginRight: '10px' }} />
      예약현황 보기
    </Title>

    {loading ? (
      <Spin size="large" />
    ) : (
      <Row gutter={[16, 16]} className={styles.cardContainer}>
        {reservationList.length > 0 ? (
          reservationList?.map((reservation) => (
            <Col xs={24} sm={12} md={8} lg={4} key={reservation._id}>
              <Card
                hoverable
                cover={
                  <div className={styles.imageContainer}>
                    {reservation.item.imageUrl ? (
                      <img
                        src={reservation.item.imageUrl}
                        alt={reservation.item.name}
                        className={styles.image}
                      />
                    ) : (
                      <Typography.Text className={styles.noImageText}>이미지 없음</Typography.Text>
                    )}
                  </div>
                }
                className={styles.card}
              >
                <Card.Meta
                  title={reservation.item.name}
                  description={
                    <>
                      <span> {reservation.quantity}</span>
                      <span> / {reservation.item.location} / {new Date(reservation.timestamp).toLocaleDateString()}</span>
                    </>
                  }
                  className={styles.cardMeta}
                />

                <Button
                  type="primary"
                  onClick={() => handleReturn(reservation._id)}
                  className={styles.returnButton}
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
