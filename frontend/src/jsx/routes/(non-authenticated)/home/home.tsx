import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Card, Row, Col, Layout, Input, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import UserHeader from "../../../components/header/user-header.tsx";
import UserSidebar from "../../../components/sidebar/user-sidebar";
import Loading from "../../../components/loading/loading.jsx";

import itemService from "../../../../js/api/itemService";
import { GetItem } from "../../../../js/types/Item";

import "./home.css";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState<GetItem[]>([]);
  const [filteredEquipmentList, setFilteredEquipmentList] = useState<GetItem[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        const items = await itemService.getAll();
        setEquipmentList(items);
      } catch (error) {
        console.error("Failed to fetch equipment list in home:", error);
        setEquipmentList([]);
        message.error("물품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentList();

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredEquipmentList(
        equipmentList.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEquipmentList(equipmentList);
    }
  }, [searchQuery, equipmentList]);

  const handleViewDetails = (equipmentId: string) => {
    navigate(`/item/${equipmentId}`);
  };

  return (
    <Layout className="equipment-layout">
      <UserHeader />

      {windowWidth > 768 && (
        <Sider className="sidebar">
          <UserSidebar />
        </Sider>
      )}
      <Layout style={{ marginLeft: windowWidth > 768 ? 250 : 0 }}>
        <Content className="equipment-content">
          <div className="equipment-card-container">
            {/* Mobile Device Warning */}
            {windowWidth <= 768 && (
              <div className="mobile-warning">
                <Typography.Text type="warning" style={{ fontSize: "16px" }}>
                  노트북을 이용하는 것을 권장드립니다.
                </Typography.Text>
              </div>
            )}

            <Title level={2} className="equipment-title">
              <UnorderedListOutlined className="equipment-icon" />
              물품목록 전체보기
            </Title>

            <Search
              placeholder="이름 또는 위치로 검색"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="equipment-search"
              allowClear
            />

            {loading ? (
              <Loading />
            ) : (
              <Row gutter={[16, 16]} className="equipment-row">
                {filteredEquipmentList.length > 0 ? (
                  filteredEquipmentList.map((equipment) => (
                    <Col xs={24} sm={12} md={8} lg={4} key={equipment._id}>
                      <Card
                        hoverable
                        onClick={() => handleViewDetails(equipment._id)}
                        cover={
                          <div className="equipment-image-container">
                            {equipment.imageUrl ? (
                              <img
                                src={equipment.imageUrl}
                                alt={equipment.name}
                                className="equipment-image"
                              />
                            ) : (
                              <Typography.Text>이미지 없음</Typography.Text>
                            )}
                          </div>
                        }
                        className="equipment-card"
                      >
                        <Card.Meta
                          title={equipment.name}
                          description={equipment.location}
                          className="equipment-meta"
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Typography.Text>데이터가 없습니다.</Typography.Text>
                )}
              </Row>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
