import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Card, Row, Col, Layout, Button } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import UserHeader from "../../../components/header/user-header.tsx";
import UserSidebar from "../../../components/sidebar/user-sidebar";
import Loading from "../../../components/loading/loading.jsx";

import { useAuth } from "../../../contexts/authContext/index.jsx";
import itemService from "../../../../js/api/itemService";
import { GetItem } from "../../../../js/types/Item";
import { GetLog } from "../../../../js/types/Log";

import "./user-reservation.css";

const { Sider, Content } = Layout;
const { Title } = Typography;

export default function UserReservation() {
    // something wrong
    const [loading, setLoading] = useState(true);
    const [reservationList, setReservationList] = useState<
        (GetLog & { item?: GetItem })[]
    >([]);
    const [filteredReservationList, setFilteredReservationList] = useState<
        (GetLog & { item?: GetItem })[]
    >([]);
    const [searchQuery, setSearchQuery] = useState(""); // not implemented
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();
    const authValue = useAuth();

    useEffect(() => {
        const fetchReservationAndEquipment = async () => {
            try {
                setLoading(true);
                const reservations = await itemService.getReservations(
                    authValue.accessToken
                );
                setReservationList(reservations);
            } catch (error) {
                console.error(
                    "Failed to fetch reservations in user reservation:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReservationAndEquipment();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [authValue.accessToken]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredReservationList(
                reservationList.filter(
                    (reservation) =>
                        reservation.item?.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        reservation.item?.location
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredReservationList(reservationList);
        }
    }, [searchQuery, reservationList]);

 
    const handleReturn = async (reservationId: string) => {
        try {
            await itemService.returnItem(reservationId, authValue.accessToken);
            setReservationList((prevList) =>
                prevList.filter((r) => r._id !== reservationId)
            );
        } catch (error) {
            console.error("Failed to return item in user reservation:", error);
        }
    };

    return (
        <Layout className="reservation-layout">
            <UserHeader />

            {windowWidth > 768 && (
                <Sider className="sidebar">
                    <UserSidebar />
                </Sider>
            )}

            <Layout style={{ marginLeft: windowWidth > 768 ? 250 : 0 }}>
                <Content className="reservation-content">
                    <div className="reservation-card-container">
                        {/* Mobile Device Warning */}
                        {windowWidth <= 768 && (
                            <div className="mobile-warning">
                                <Typography.Text
                                    type="warning"
                                    style={{ fontSize: "16px" }}
                                >
                                    노트북을 이용하는 것을 권장드립니다.
                                </Typography.Text>
                            </div>
                        )}

                        <Title level={2} className="reservation-title">
                            <UnorderedListOutlined className="reservation-icon" />
                            예약 현황 보기
                        </Title>

                        {loading ? (
                            <Loading />
                        ) : (
                            <Row gutter={[16, 16]} className="reservation-row">
                                {filteredReservationList.length > 0 ? (
                                    filteredReservationList.map(
                                        (reservation) => (
                                            <Col
                                                xs={24}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                key={reservation._id}
                                            >
                                                <Card
                                                    cover={
                                                        <div className="reservation-image-container">
                                                            {reservation.item
                                                                ?.imageUrl ? (
                                                                <img
                                                                    src={
                                                                        reservation
                                                                            .item
                                                                            .imageUrl
                                                                    }
                                                                    alt={
                                                                        reservation
                                                                            .item
                                                                            .name
                                                                    }
                                                                    className="reservation-image"
                                                                />
                                                            ) : (
                                                                <Typography.Text className="noImageText">
                                                                    이미지 없음
                                                                </Typography.Text>
                                                            )}
                                                        </div>
                                                    }
                                                    className="reservation-card"
                                                   
                                                >
                                                    <Card.Meta
                                                        title={
                                                            reservation.item
                                                                ?.name ||
                                                            "이름 없음"
                                                        }
                                                        description={
                                                            <>
                                                                <span>{reservation.quantity}</span>
                                                                <span>
                                                                    {" "}/{" "}{reservation.item?.location ||"위치 정보 없음"}{" "}/{" "}
                                                                    {reservation.timestamp? new Date(reservation.timestamp).toLocaleDateString()
                                                                        : "날짜 없음"}
                                                                </span>
                                                            </>
                                                        }
                                                        className="reservation-meta"
                                                    />

                                                    <Button 
                                                        onClick={() =>
                                                            handleReturn(reservation._id)
                                                        }
                                                        className="reservation-button"
                                                    >
                                                        반납하기</Button>
                                                </Card>
                                            </Col>
                                        )
                                    )
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
