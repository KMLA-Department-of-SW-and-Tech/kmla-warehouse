import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, message, Layout, Select } from "antd";
import UserHeader from "../../../components/header/user-header.tsx";
import UserSidebar from "../../../components/sidebar/user-sidebar";

import { useAuth } from "../../../contexts/authContext";
import { signUserOut } from "../../../../js/firebase/auth";
import userService from "../../../../js/api/userService";

import "./user-account-settings.css";

const { Sider, Content } = Layout;
const { Option } = Select;

const UserAccountSettings = () => {
    const [userName, setUserName] = useState<string>("Guest");
    const [userGrade, setUserGrade] = useState<number | undefined>(undefined);
    const [userClassNumber, setUserClassNumber] = useState<number | undefined>(
        undefined
    );
    const [userStudentNumber, setUserStudentNumber] = useState<
        number | undefined
    >(undefined);
    const [teamNames, setTeamNames] = useState<string[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
        undefined
    );
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const authValue = useAuth();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await userService.getUserInfo(
                    authValue.accessToken
                );
                const teams = await userService.getTeamNameList();
                setUserName(userInfo.userName || "Guest");
                setUserGrade(
                    userInfo.userGrade ? Number(userInfo.userGrade) : undefined
                );
                setUserClassNumber(
                    userInfo.userClassNumber
                        ? Number(userInfo.userClassNumber)
                        : undefined
                );
                setUserStudentNumber(
                    userInfo.userStudentNumber
                        ? Number(userInfo.userStudentNumber)
                        : undefined
                );
                setTeamNames(teams);
                setSelectedTeam(userInfo.teamName || teams[0]);
            } catch (error) {
                message.error("유저 정보를 불러오는 데 실패했습니다.");
                console.error(
                    "Failed to fetch user info in user account settings: ",
                    error
                );
            }
        };
        fetchUserInfo();
    }, [authValue.accessToken]);

    const handleLogout = async () => {
        setSaving(true);
        try {
            await signUserOut();
            message.success("성공적으로 로그아웃하였습니다.");
            navigate("/home");
        } catch (error) {
            message.error("로그아웃하는데 실패하였습니다. 다시 시도해주세요.");
            console.error("Failed log out in user account settings: ", error);
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await userService.updateCurrentUserInfo(
                {
                    userName,
                    userGrade,
                    userClassNumber,
                    userStudentNumber,
                    teamName: selectedTeam,
                },
                authValue.accessToken
            );
            message.success("정보가 성공적으로 저장되었습니다.");
        } catch (error) {
            message.error("정보 저장에 실패했습니다.");
            console.error(
                "Failed to save information in user account settings: ",
                error
            );
        } finally {
            setSaving(false);
        }
    };
    return (
        <Layout className="layout">
            <UserHeader />
            <Sider className="sidebar">
                <UserSidebar />
            </Sider>
            <Layout className="content-layout">
                <Content className="content">
                    <div className="form-container">
                        <h2>계정 정보 수정</h2>
                        <Form layout="vertical">
                            <Form.Item label="이름">
                                <Input
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="학년">
                                <Input
                                    type="number"
                                    value={userGrade || ""}
                                    onChange={(e) =>
                                        setUserGrade(Number(e.target.value))
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="반">
                                <Input
                                    type="number"
                                    value={userClassNumber || ""}
                                    onChange={(e) =>
                                        setUserClassNumber(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="학번">
                                <Input
                                    type="number"
                                    value={userStudentNumber || ""}
                                    onChange={(e) =>
                                        setUserStudentNumber(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="팀 이름">
                                <Select
                                    value={selectedTeam}
                                    onChange={setSelectedTeam}
                                >
                                    {teamNames.map((team) => (
                                        <Option key={team} value={team}>
                                            {team}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Button
                                type="primary"
                                onClick={handleSave}
                                loading={saving}
                            >
                                저장
                            </Button>
                            <Button onClick={handleLogout} loading={saving}>
                                로그아웃
                            </Button>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserAccountSettings;
