import React, { useState } from 'react';
import { Typography, Card, Row, Col, Spin, Layout } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../components/equipment/equipment-bar'; // Importing the sidebar component

const { Sider, Content } = Layout;

interface Item {
  id: string;
  name: string;
  location: string;
  photoUrl?: string;
}

export default function EquipmentListPage() {
  const [loading, setLoading] = useState(false);
  const [equipmentList, setEquipmentList] = useState<Item[]>([
    {
      id: '1',
      name: '3D 프린터',
      location: 'Lab A',
      photoUrl: '',
    },
    {
      id: '2',
      name: '레이저 커터',
      location: 'Lab B',
      photoUrl: '',
    },
    {
      id: '3',
      name: 'CNC 머신',
      location: 'Lab C',
      photoUrl: '',
    },
  ]);

  const navigate = useNavigate(); // Initialize the navigate function

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
          position: 'fixed', // Keep the sidebar fixed
          height: '100vh',
          left: 0,
          top: 0,
        }}
      >
        <Sidebar />
      </Sider>

      {/* Main content */}
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ padding: '20px' }}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {equipmentList?.map((equipment) => (
                <Col xs={8} sm={8} md={8} lg={8} key={equipment.id}>
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
                        <Typography.Text>이미지 없음</Typography.Text>
                      </div>
                    }
                    actions={[
                      <CalendarOutlined
                        key="view"
                        onClick={() => handleViewDetails(equipment.id)}
                      />,
                    ]}
                    style={{ minWidth: '200px', height: '300px' }} // 최소 너비 설정
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
