import React from "react";
import { useNavigate } from "react-router-dom";

import { Menu, MenuProps, Badge } from "antd";
import {
    AppstoreOutlined,
    HistoryOutlined,
    UserOutlined,
} from "@ant-design/icons";

import "./sidebar.css";

const UserSidebar: React.FC = () => {
    const navigate = useNavigate();
    const items1: MenuProps["items"] = [
        {
            key: "categories",
            label: "카테고리",
            type: "group",
            children: [
                {
                    key: "/home",
                    icon: <AppstoreOutlined />,
                    label: "전체 목록보기",
                },
            ],
        },
        {
            key: "mypage",
            label: "마이페이지",
            type: "group",
            children: [
                {
                    key: "/reservation",
                    icon: (
                        <Badge size="small">
                            <HistoryOutlined />
                        </Badge>
                    ),
                    label: "반납하기",
                },
                {
                    key: "/account-settings",
                    icon: <UserOutlined />,
                    label: "계정 및 로그아웃",
                },
            ],
        },
    ];

    const handleMenuClick = async (e: { key: string }) => {
        navigate(`${e.key}`);
    };

    return (
        <Menu
            defaultSelectedKeys={["home"]}
            onClick={handleMenuClick}
            items={items1}
            className="sidebar"
        />
    );
};

export default UserSidebar;
