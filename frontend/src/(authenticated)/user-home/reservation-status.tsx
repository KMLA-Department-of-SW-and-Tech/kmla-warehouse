import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Import the icon
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
  const [currentUserId, setCurrentUserId] = useState("")
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchReservationAndEquipment = async () => {
      try {
          //aware current user information
        const userInfo = await teamService.getUserInfo();
        console.log('Fetched user info:', userInfo);
        setCurrentUserId(userInfo);
          //fetch reservation list
        const reservations = await itemService.getReservations(userInfo._id);
        console.log('Fetched reservations:', reservations);
        setReservationList(reservations);
      } catch (error) {
        console.log("Failed to fetch:", error)
      } finally {
        // console.log(reservationList);
        // console.log(currentUserId);
        setLoading(false)
      }
    }

    fetchReservationAndEquipment();
  },[]);

  const handleViewDetails = (equipmentId: string) => {
    navigate(`/kmla-warehouse/item/${equipmentId}`); // Navigate to the details page
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
                reservationList?.map((equipment) => (
                  <Col xs={24} sm={12} md={8} lg={4} key={equipment._id}>
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
                          {equipment.item.photoUrl ? (
                            <img
                              src={equipment.item.photoUrl}
                              alt={equipment.item.name}
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
                      style={{ maxWidth: '220px', height: '300px' }}
                    >
                      <Card.Meta
                        title={equipment.item.name}
                        description={`${equipment.item.location} / ${new Date(equipment.timestamp).toLocaleDateString()}`}
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
