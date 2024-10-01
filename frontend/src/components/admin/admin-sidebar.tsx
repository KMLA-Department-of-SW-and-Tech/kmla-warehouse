import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge } from 'antd';
import { 
  HomeOutlined, 
  HistoryOutlined, 
  ProductOutlined, 
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';



const Sidebar: React.FC = () => {
  const navigate = useNavigate();

const items1: MenuProps['items'] = [
  {
    key: 'test',
    label: 'test\ntest\ntest\ntest',
    type: 'group',
  },
  {
    key: 'test2',
    label: '',
    type: 'group',
  },
  {
    key: 'manage',
    label: '관리 페이지',
    type: 'group',
    children: [
      {
        key: 'kmla-warehouse/admin/equipment',
        icon: <ProductOutlined />,
        label: '물품관리',
      },
      {
        key: 'kmla-warehouse/admin/team',
        icon: <TeamOutlined />,
        label: '팀관리',
      },
      {
        key: 'kmla-warehouse/admin/reservation',
        icon: <Badge size='small' count={5}><HistoryOutlined /></Badge>,
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
        key: 'kmla-warehouse/admin/setting',
        icon: <UserOutlined />,
        label: '계정설정',
      },
    ],
  },
  
];

const handleMenuClick = (e: {key: string}) => {
  navigate(`/${e.key}`);
};
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['home']}
      onClick={handleMenuClick}
      items={items1}
      style={{
        height: '100vh',
        paddingTop: '10px',
        position: 'fixed', // 사이드바 고정
        top: 0,
        left: 0,
        width: '200px', // 너비를 설정하여 고정
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // 그림자 추가
      }}
    />
  );
};

export default Sidebar;
