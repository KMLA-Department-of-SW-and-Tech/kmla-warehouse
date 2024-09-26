import React, { useEffect, useState } from 'react';
import { Typography, Spin, Card, Layout, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { itemService } from '../../api/itemService';
import Sidebar from '../../components/equipment/equipment-bar';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  location: string;
  photoUrl?: string;
}

export default function EquipmentDetailPage() {
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [item, setItem] = useState<Item | null>(null); // 선택된 아이템
  const { id } = useParams<{ id: string }>(); // 라우트에서 ID 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return;
      try {
        const fetchedItem = await itemService.getById(id); // API를 통해 아이템 상세 정보 가져오기
        console.log('Fetched item:', fetchedItem);
        setItem(fetchedItem);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setItem(null); // 에러 발생 시 null로 설정
      } finally {
        setLoading(false); // 로딩 끝
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/kmla-warehouse'); // 목록으로 돌아가기
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
          {loading ? (
            <Spin size="large" />
          ) : item ? (
            <Card
              hoverable
              cover={
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography.Text>이미지 없음</Typography.Text>
                  )}
                </div>
              }
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <Title level={3}>{item.name}</Title>
              <Text>{item.description}</Text>
              <div style={{ marginTop: '20px' }}>
                <Text strong>수량: </Text>
                <Text>{item.quantity}</Text>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Text strong>위치: </Text>
                <Text>{item.location}</Text>
              </div>
              <Button type="primary" style={{ marginTop: '20px' }} onClick={handleBack}>
                돌아가기
              </Button>
            </Card>
          ) : (
            <Typography.Text>아이템 정보를 불러오지 못했습니다.</Typography.Text>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
