import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge } from 'antd';
import {
  AppstoreOutlined,
  HistoryOutlined,
  UserOutlined,

} from '@ant-design/icons';

const MenuBar: React.FC = () => {
  const navigate = useNavigate();

  const items1: MenuProps['items'] = [
    {
      key: 'categories',
      label: '카테고리',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/home',
          icon: <AppstoreOutlined />,
          label: '전체보기',
        },

      ],
    },
    {
      key: 'mypage',
      label: '마이페이지',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/reservation-status',
          icon: <Badge size="small"><HistoryOutlined /></Badge>,
          label: '예약현황',
        },
        {
          key: 'kmla-warehouse/account-settings',
          icon: <UserOutlined />,
          label: '계정설정',
        },
      ],
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['home']}
      onClick={handleMenuClick}
      items={items1}
      style={{ height: '100vh', paddingTop: '10px', boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', }}
    />
  );
};

export default MenuBar;
