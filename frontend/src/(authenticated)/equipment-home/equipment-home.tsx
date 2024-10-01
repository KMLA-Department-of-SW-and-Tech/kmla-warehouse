import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Spin, Layout, Input } from 'antd';
import { CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/equipment/equipment-bar';
import { itemService } from '../../api/itemService'; 
import Headbar from '../../components/header';

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

interface Item {
  _id: string;
  name: string;
  location: string;
  photoUrl?: string;
}

export default function EquipmentListPage() {
  const [loading, setLoading] = useState(true); // Start loading as true
  const [equipmentList, setEquipmentList] = useState<Item[]>([]); // Empty list initially
  const [filteredEquipmentList, setFilteredEquipmentList] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch equipment list from API
    const fetchEquipmentList = async () => {
      try {
        const items = await itemService.getAll();  // Fetch all items from the API
        console.log('Fetched items:', items); // Add this line to check the response
        setEquipmentList(items);
        setFilteredEquipmentList(items); // Initialize filtered list
      } catch (error) {
        console.error('Failed to fetch equipment list:', error);
        setEquipmentList([]); // Handle error by setting empty array
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchEquipmentList();
  }, []);

  useEffect(() => {
    // Filter equipment list based on search query
    if (searchQuery) {
      const filteredItems = equipmentList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEquipmentList(filteredItems);
    } else {
      setFilteredEquipmentList(equipmentList); // Show all items if query is empty
    }
  }, [searchQuery, equipmentList]);

  const handleViewDetails = (equipmentId: string) => {
    navigate(`/kmla-warehouse/item/${equipmentId}`); 
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
            물품목록 전체보기
          </Title>

          {/* Search input below the title */}
          <Search
            placeholder="이름 또는 위치로 검색"
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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
                      style={{ maxWidth: '220px', height: '300px' }}
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
    </Layout>
  );
}
