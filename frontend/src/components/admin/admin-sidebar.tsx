import React from 'react';
import { Menu, MenuProps } from 'antd';
import { HomeOutlined, AppstoreOutlined, HistoryOutlined, LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';


const items1: MenuProps['items'] = [
  {
    key: 'mypage',
    label: '관리자 페이지',
    type: 'group',
    children: [
      {
        key: 'home',
        icon: <HomeOutlined />,
        label: '홈화면',
      },
      {
        key: 'reservation',
        icon: <AppstoreOutlined />,
        label: '예약 관리',
      },
      {
        key: 'history',
        icon: <HistoryOutlined />,
        label: '히스토리',
      },
    ],
  },
  {
    key: 'categories',
    label: '물품 카테고리',
    type: 'group',
    children: [
      {
        key: 'all',
        label: '전체물품',
      },
      {
        key: 'electronics',
        label: '전자부품',
      },
      {
        key: 'measuring',
        label: '측정기기',
      },
      {
        key: 'tools',
        label: '공구',
      },
    ],
  },
  
];


const Sidebar: React.FC = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['home']}
      style={{ height: '100vh', paddingTop: '10px'}}
      items={items1}
      
    />
  );
};

export default Sidebar;
