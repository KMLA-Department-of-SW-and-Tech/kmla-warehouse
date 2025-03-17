import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography, Layout, Button, message, Form, InputNumber } from "antd";
import UserHeader from "../../../components/header/user-header.tsx";
import UserSidebar from "../../../components/sidebar/user-sidebar";
import LoginModal from "../../../components/login-modal/login-modal.jsx";
import NotAuthorizedModal from "../../../components/not-authorized-modal/not-authorized-modal.jsx";
import Loading from "../../../components/loading/loading.jsx";

import { useAuth } from "../../../contexts/authContext";
import itemService from "../../../../js/api/itemService";
import { GetItem } from "../../../../js/types/Item";

import "./item-details.css";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

export default function ItemDetails() {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState<GetItem | null>(null);
    const [borrowQuantity, setBorrowQuantity] = useState<number>(1);
    const [showLoginModal, setShowLoginModal] = useState<Boolean>(false);
    const [showNotAuthModal, setShowNotAuthModal] = useState<Boolean>(false);
    const authValue = useAuth();
    const { id } = useParams<{ id: string }>();

    const fetchItemDetails = async () => {
        if (!id) return;
        try {
            const fetchedItem = await itemService.getById(id);
            setItem(fetchedItem);
        } catch (error) {
            console.error(
                "Failed to fetch item details in item details:",
                error
            );
            setItem(null);
            message.error("물품을 불러오는 데 실패했습니다.");
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
            message.error("유효한 수량을 입력하세요.");
            return;
        }
        try {
            if (!authValue.userLoggedIn) {
                setShowLoginModal(true);
                return;
            }
            if (authValue.userType !== "User") {
                setShowNotAuthModal(true);
                return;
            }
            await itemService.borrowRequest(
                id,
                borrowQuantity,
                authValue.accessToken
            );
            message.success("대여 요청이 성공적으로 처리되었습니다.");
            setItem((it) => {
                const newItem = JSON.parse(JSON.stringify(it));
                newItem.quantity -= borrowQuantity;
                return newItem;
            });
        } catch (error) {
            console.error("Failed to borrow item in item details:", error);
            if (error.response) {
                const status = error.response.status;
                const messageText =
                    error.response.data.message || error.message;
                if (status === 404) {
                    message.error(messageText || "아이템을 찾을 수 없습니다.");
                } else if (status === 400) {
                    message.error(
                        messageText || "유효하지 않은 대여 요청입니다."
                    );
                } else if (status === 500) {
                    message.error(messageText || "서버 오류가 발생했습니다.");
                } else {
                    message.error(
                        "대여 요청에 실패했습니다. 다시 시도해 주세요."
                    );
                }
            } else {
                message.error("대여 요청에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    };

    return showLoginModal ? (
        <LoginModal
            openModal={showLoginModal}
            redirectToHomeOnCancel={false}
            callBack={() => setShowLoginModal(false)}
        />
    ) : showNotAuthModal ? (
        <NotAuthorizedModal
            openModal={showNotAuthModal}
            redirectToHomeOnCancel={false}
            callBack={() => setShowNotAuthModal(false)}
        />
    ) : (
        <Layout>
            <UserHeader />
            <Layout className="layout">
                <Sider className="sider">
                    <UserSidebar />
                </Sider>
                <Layout className="content-layout">
                    <Content className="content">
                        {loading ? (
                            <Loading />
                        ) : item ? (
                            <div className="content-wrapper">
                                <div className="image-container">
                                    <div className="image-placeholder">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="image"
                                            />
                                        ) : (
                                            <Typography.Text className="no-image-text">
                                                이미지를 불러올 수 없음
                                            </Typography.Text>
                                        )}
                                    </div>
                                </div>
                                <div className="text-content">
                                    <Title level={1}>{item.name}</Title>
                                    <Title level={3}>물품 정보</Title>
                                    <Text>남은 수량 {item.quantity} 개</Text>
                                    <div style={{ marginTop: "10px" }}>
                                        <Text>위치 {item.location}</Text>
                                        <Title level={5}>물품 설명</Title>
                                        <Text>{item.description}</Text>
                                    </div>
                                    <Form
                                        layout="vertical"
                                        className="borrow-form"
                                    >
                                        <Form.Item label="대여할 수량을 선택하세요">
                                            <InputNumber
                                                min={1}
                                                max={item.quantity}
                                                value={borrowQuantity}
                                                onChange={(value) =>
                                                    setBorrowQuantity(
                                                        value || 1
                                                    )
                                                }
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            onClick={handleBorrow}
                                        >
                                            대여하기
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        ) : (
                            <Typography.Text>
                                아이템 정보를 불러오지 못했습니다. 과학기술부에
                                문의하세요.
                            </Typography.Text>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
