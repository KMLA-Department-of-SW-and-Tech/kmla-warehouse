import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Spin, Layout } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'; // Import the icon
import Sidebar from '../../components/equipment/equipment-bar';
import Headbar from '../../components/header.tsx';
import { itemService } from '../../api/itemService'; // Import the itemService
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosPrivate from "../../hooks/axiosPrivate.js";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Item {
  _id: string;
  name: string;
  location: string;
  photoUrl?: string;
}

interface Reservation {
  item: string;
  team: string;
  quantity: number;
}

export default function ReservationStatus() {
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("")
  const [equipmentList, setEquipmentList] = useState<Item[]>([]);
  const [reservationList, setReservationList] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchReservationAndEquipment = async () => {
      try {
        const userInfo = await itemService.getUserInfo();
        console.log('Fetched user info:', currentUserId);
        setCurrentUserId(userInfo);

        const items = await itemService.getAll();
        console.log('Fetched items:', items);
        setEquipmentList(items);
        
        const reservations = await itemService.getReservations();
        const reservationData = reservations.filter(
          reservation => reservation.team === currentUserId
        );
        console.log('Fetched reservations:', reservations);
        setReservationList(reservationData);
      } catch (error) {
        console.log("Failed to fetch Reservation list, Equipment list:", error)
        setEquipmentList([]);
        setReservationList([]);
        setCurrentUserId('');
      } finally {
        console.log(equipmentList);
        console.log(reservationList);
        console.log(currentUserId);
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
        </Content>
      </Layout>
    </Layout>
  );
}
