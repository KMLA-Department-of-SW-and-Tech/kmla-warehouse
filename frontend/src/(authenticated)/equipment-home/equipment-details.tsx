import React, { useEffect, useState } from 'react';
import { Typography, Spin, Layout, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { itemService } from '../../api/itemService';
import Sidebar from '../../components/equipment/equipment-bar';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

interface Item {
  _id: string;
  name: string;
  description: string;
  totalQuantity: number;
  availableQuantity: number;
  location: string;
  photoUrl?: string;
  tags: string[]; // Array of ObjectId (represented as strings)
  status: 'available' | 'deleted'; // Enum for status
  category: string; // ObjectId (represented as string)
}

export default function EquipmentDetailPage() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return;
      try {
        const fetchedItem = await itemService.getById(id);
        console.log('Fetched item:', fetchedItem);
        setItem(fetchedItem);
      } catch (error) {
        console.error('Failed to fetch item details:', error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);
 
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

      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ padding: '40px', width: 'calc(100vw - 250px)' }}>
          {loading ? (
            <Spin size="large" />
          ) : item ? (
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'row' }}>
              {/* Left side: Image */}
              <div style={{ width: '50%', position: 'relative' }}>
                <div
                  style={{
                    width: '100%',
                    height: '0',
                    paddingTop: '100%', // This maintains the 1:1 aspect ratio
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Typography.Text
                      style={{
                        position: 'absolute',
                        textAlign: 'center',
                        color: '#888',
                        fontSize: '16px',
                      }}
                    >
                    
                    </Typography.Text>
                  )}
                </div>

          

                {/* Placeholder for additional images */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}
                >
                  <div style={{ width: '30%', backgroundColor: '#f0f0f0', height: '50px' }} />
                  <div style={{ width: '30%', backgroundColor: '#f0f0f0', height: '50px' }} />
                  <div style={{ width: '30%', backgroundColor: '#f0f0f0', height: '50px' }} />
                </div>
              </div>

              {/* Right side: Text content */}
              <div style={{ width: '50%', paddingLeft: '50px' }}>
                <Title level={1}>{item.name}</Title>
                <Text>남은 수량 {item.availableQuantity} 개</Text> 
                
                <div style={{ marginTop: '10px' }}>
                  <Text>위치 {item.location}</Text> 
                  <Title level={5}>[제품 설명]</Title>
                  <Text>{item.description}</Text>
                </div>

                <Button type="primary" style={{ marginTop: '20px' }} onClick={() => handle()}>
                  대여하기
                </Button>
              </div>
            </div>
          ) : (
            <Typography.Text>아이템 정보를 불러오지 못했습니다.</Typography.Text>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
