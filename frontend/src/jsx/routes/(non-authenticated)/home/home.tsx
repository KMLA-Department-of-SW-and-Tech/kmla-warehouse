import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Spin, Layout, Input, Modal } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/user/user-sidebar';
import { itemService } from '../../../../js/api/itemService'; 
import Headbar from '../../../components/user/header';
import {GetItem, PostItem, PatchItem} from '../../../../js/types/Item';

// needs deletion
import LoginModal from "../../../components/login-modal";


//import "./home.css"

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState<GetItem[]>([]);
  const [filteredEquipmentList, setFilteredEquipmentList] = useState<GetItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        const items = await itemService.getAll();
        setEquipmentList(items);
      } catch (error) {
        console.error('Failed to fetch equipment list:', error);
        setEquipmentList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentList();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredEquipmentList(
        equipmentList.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEquipmentList(equipmentList);
    }
  }, [searchQuery, equipmentList]);

  const handleViewDetails = (equipmentId: string) => {
    if (windowWidth <= 768) {
      setSelectedItemId(equipmentId);
      setIsModalVisible(true);
    } else {
      navigate(`/item/${equipmentId}`);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    if (selectedItemId) {
      navigate(`/home`);
      setIsModalVisible(false);
    }
  };

  return (
    <Layout className="equipment-layout">
      <Headbar />
      
      {windowWidth > 768 && (
        <Sider className="equipment-sider">
          <Sidebar />
        </Sider>
      )}
      <LoginModal openModal={true} />
      <Layout style={{ marginLeft: windowWidth > 768 ? 250 : 0 }}>
        <Content style={{ padding: '40px', marginTop: '64px', width: windowWidth > 768 ? 'calc(98vw - 250px)' : '100%' }}>
          <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
            <UnorderedListOutlined style={{ marginRight: '10px' }} />
            물품목록 전체보기
          </Title>
          
          <Search
            placeholder="이름 또는 위치로 검색"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '20px', maxWidth: '400px' }}
            allowClear
          />
          
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              {filteredEquipmentList.length > 0 ? (
                filteredEquipmentList.map((equipment, index) => (
                  <Col xs={24} sm={12} md={8} lg={4} key={equipment._id}>
                    <Card
                      hoverable
                      onClick={() => handleViewDetails(equipment._id)}
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
                          {equipment.imageUrl ? (
                            <img
                              src={equipment.imageUrl}
                              alt={equipment.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Typography.Text>이미지 없음</Typography.Text>
                          )}
                        </div>
                      }
                      style={{ maxWidth: '220px', height: '260px' }}
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
                ))
              ) : (
                <Typography.Text>데이터가 없습니다.</Typography.Text>
              )}
            </Row>
          )}
        </Content>
      </Layout>

      <Modal
        title="아이템 상세 보기"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        cancelText="취소"
      >
        <Typography.Text>이 페이지는 모바일 화면에서 열 수 없습니다. 더 큰 화면에서 확인해주세요.</Typography.Text>
      </Modal>
    </Layout>
  );
}
