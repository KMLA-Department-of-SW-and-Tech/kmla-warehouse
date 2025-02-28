import React, { useEffect, useState } from 'react';
import './equipment-details.css'; 
import { Typography, Spin, Layout, Button, message, Form, InputNumber } from 'antd'; 
import { useParams } from 'react-router-dom';
import { itemService } from '../../../../js/api/itemService';
import Sidebar from '../../../components/user/user-sidebar';
import Headbar from '../../../components/user/header';
import {GetItem, PostItem, PatchItem} from '../../../../js/types/Item';
import { useAuth } from '../../../contexts/authContext';
const { Sider, Content } = Layout;
const { Title, Text } = Typography;


export default function EquipmentDetails() {
  // State to manage loading status, item details, and borrowing quantity
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<GetItem | null>(null);
  const [borrowQuantity, setBorrowQuantity] = useState<number>(1);
  const authValue = useAuth();

  // Retrieve the item ID from route parameters
  const { id } = useParams<{ id: string }>();

  // Fetch item details by ID
  const fetchItemDetails = async () => {
    if (!id) return;
    try {
      const fetchedItem = await itemService.getById(id);
      setItem(fetchedItem);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
      setItem(null);
      throw(error);
    } finally {
      setLoading(false);
    }
  };

  // Load item details when component mounts or ID changes
  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  // Handle the borrow request
  const handleBorrow = async () => {
    if (!id) return;
    if (borrowQuantity < 1) {
      message.error('유효한 수량을 입력하세요.'); // Error message for invalid quantity
      return;
    }
    try {
      await itemService.borrowRequest(id, borrowQuantity, "user", authValue.accessToken); // Send borrow request
      message.success('대여 요청이 성공적으로 처리되었습니다.'); // Success message
      window.location.reload(); // Reload page to reflect updated status
    } catch (error) {
      console.error('Failed to borrow item:', error);
      if (error.response) {
        const status = error.response.status; // HTTP status code
        const messageText = error.response.data.message || error.message; // Error message from server

        // Display error messages based on HTTP status codes
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
      <Headbar /> 
      <Layout className="layout">
        <Sider className="sider">
          <Sidebar /> {/* Sidebar for navigation */}
        </Sider>
        <Layout style={{ marginLeft: 250 }}>
          <Content className="content">
            {/* Show spinner while loading */}
            {loading ? (
              <Spin size="large" />
            ) : item ? (
              // Display item details if fetched successfully
              <div className="content-wrapper">
                <div className="image-container">
                  <div className="image-placeholder">
                    {/* Display item image if available */}
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="image" />
                    ) : (
                      <Typography.Text className="no-image-text">이미지를 불러올 수 없음</Typography.Text>
                    )}
                  </div>
                </div>
                <div className="text-content">
                  <Title level={1}>{item.name}</Title> {/* Item name */}
                  <Text>남은 수량 {item.quantity} 개</Text> {/* Available quantity */}
                  <div style={{ marginTop: '10px' }}>
                    <Text>위치 {item.location}</Text> {/* Item location */}
                    <Title level={5}>물품 설명</Title>
                    <Text>{item.description}</Text> {/* Item description */}
                  </div>
                  {/* Borrow form */}
                  <Form layout="vertical" className="borrow-form">
                    <Form.Item label="대여할 수량을 선택하세요">
                      {/* Input for borrowing quantity */}
                      <InputNumber
                        min={1}
                        max={item.quantity}
                        value={borrowQuantity}
                        onChange={(value) => setBorrowQuantity(value || 1)}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                    <Button type="primary" onClick={handleBorrow}>대여하기</Button>
                  </Form>
                </div>
              </div>
            ) : (
              // Fallback message if item details couldn't be loaded
              <Typography.Text>아이템 정보를 불러오지 못했습니다. 과학기술부에 문의하세요.</Typography.Text>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
