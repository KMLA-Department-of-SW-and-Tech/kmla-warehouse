import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge } from 'antd';
import { 
  AccountBookOutlined, 
  AppstoreAddOutlined,
  UsergroupAddOutlined, 
  UserOutlined
} from '@ant-design/icons';
import './sidebar.css';


const Sidebar: React.FC = () => {
  const navigate = useNavigate();

// menu of admin sidebar
const items1: MenuProps['items'] = [
  {
    key: 'manage',
    label: '관리 페이지',
    type: 'group',
    children: [
      {
        key: '/admin/item',
        icon: <AppstoreAddOutlined />,
        label: '물품관리',
      },
      {
        key: '/admin/reservation',
        icon: <AccountBookOutlined />,
        label: '신청관리',
      },
      {
        key: '/admin/userlist',
        icon: <UsergroupAddOutlined />,
        label: '가입승인',
      },
      {
        key: '/admin/permission',
        icon: <UsergroupAddOutlined />,
        label: '가입승인',
      },
    ],
  },
  {
    key: 'categories',
    label: '마이 페이지',
    type: 'group',
    children: [
      {
        key: '/admin/account-settings',
        icon: <UserOutlined />,
        label: '로그아웃',
      },
    ],
  },
  
];

// go to page you clicked on the sidebar
const handleMenuClick = (e: {key: string}) => {
  navigate(`${e.key}`);
};
  return (
    <Menu
      defaultSelectedKeys={['home']}
      onClick={handleMenuClick}
      items={items1}
      className="sidebar"
    />
    
  );
};

export default Sidebar;
