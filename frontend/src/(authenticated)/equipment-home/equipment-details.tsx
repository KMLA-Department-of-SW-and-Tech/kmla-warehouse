import React, { useEffect, useState } from 'react';
import { Typography, Spin, Layout, Button, message, Form, InputNumber } from 'antd'; 
import { useParams } from 'react-router-dom';
import { itemService } from '../../api/itemService';
import Sidebar from '../../components/equipment/equipment-bar';
import Headbar from '../../components/header';

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
  tags: string[];
  status: 'available' | 'deleted';
  category: string;
}

export default function EquipmentDetailPage() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item | null>(null);
  const [borrowQuantity, setBorrowQuantity] = useState<number>(1);
  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  const handleBorrow = async () => {
    if (!id) return;
    if (borrowQuantity < 1) {
      message.error('유효한 수량을 입력하세요.');
      return;
    }
    try {
      await itemService.borrowRequest(id, borrowQuantity);
      message.success('대여 요청이 성공적으로 처리되었습니다.');
  
      // Reload the page to refresh item details
      window.location.reload();
  
    } catch (error) {
      console.error('Failed to borrow item:', error);
      if (error.response) {
        const status = error.response.status;
        const messageText = error.response.data.message || error.message;
  
        if (status === 404) {
          message.error(messageText || '아이템을 찾을 수 없습니다.');
        } else if (status === 400) {
          message.error(messageText || '유효하지 않은 대여 요청입니다.');
        } else if (status === 500) {
          message.error(messageText || '서버 오류가 발생했습니다.');
        } else {
          message.error('대여 요청에 실패했습니다. 다시 시도해 주세요.');
        }
      } else {
        message.error('대여 요청에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };
  

  return (
    <Layout>
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
          <Content 
            style={{ 
              padding: '40px', 
              marginTop: '64px', // 헤더 높이만큼 여백을 추가해서 겹침 방지
              width: 'calc(100vw - 250px)', 
            }}
          >
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
                      paddingTop: '100%',
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
                        이미지 없음
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

                  {/* Borrow form */}
                  <Form layout="vertical" style={{ marginTop: '20px' }}>
                    <Form.Item label="대여할 수량을 선택하세요">
                      <InputNumber
                        min={1}
                        max={item.availableQuantity}
                        value={borrowQuantity}
                        onChange={(value) => setBorrowQuantity(value || 1)}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>

                    <Button type="primary" onClick={handleBorrow}>
                      대여하기
                    </Button>
                  </Form>
                </div>
              </div>
            ) : (
              <Typography.Text>아이템 정보를 불러오지 못했습니다.</Typography.Text>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
