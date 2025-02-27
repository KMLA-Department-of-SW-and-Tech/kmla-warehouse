import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge } from 'antd';
import { 
  HistoryOutlined, 
  ProductOutlined, 
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import './admin-sidebar.css';



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
        key: '/admin/equipment',
        icon: <ProductOutlined />,
        label: '물품관리',
      },
      {
        key: '/admin/reservation',
        icon: <Badge size='small'><HistoryOutlined /></Badge>,
        label: '신청관리',
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
        label: '계정설정',
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
      mode="inline"
      defaultSelectedKeys={['home']}
      onClick={handleMenuClick}
      items={items1}
      className="sidebar"
    />
    
  );
};

export default Sidebar;
