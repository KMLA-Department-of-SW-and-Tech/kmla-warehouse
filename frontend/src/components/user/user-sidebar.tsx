import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge, Modal } from 'antd';
import { AppstoreOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
//import authService from '../../api/authService';
import './user-sidebar.css'; // CSS 파일을 가져옵니다.

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const items1: MenuProps['items'] = [
    {
      key: 'categories',
      label: '카테고리',
      type: 'group',
      children: [
        {
          key: '/home',
          icon: <AppstoreOutlined />,
          label: '전체 목록보기',
        },
      ],
    },
    {
      key: 'mypage',
      label: '마이페이지',
      type: 'group',
      children: [
        {
          key: '/reservation',
          icon: (
            <Badge size="small">
              <HistoryOutlined />
            </Badge>
          ),
          label: '반납하기',
        },
        {
          key: '/account-settings',
          icon: <UserOutlined />,
          label: '계정 및 로그아웃',
        },
      ],
    },
  ];

  const handleMenuClick = async (e: { key: string }) => {
    navigate(`${e.key}`);
  };


  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['home']}
      onClick={handleMenuClick}
      items={items1}
      className="menu-bar" // CSS 클래스 추가
    />
  );
};

export default MenuBar;
