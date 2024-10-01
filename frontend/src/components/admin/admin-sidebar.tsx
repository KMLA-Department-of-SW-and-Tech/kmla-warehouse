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
    key: 'manage',
    label: '관리 페이지',
    type: 'group',
    children: [
      {
        key: 'kmla-warehouse/admin/home',
        icon: <HomeOutlined />,
        label: '홈화면',
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
      {
        key: 'kmla-warehouse/admin/equipment',
        icon: <ProductOutlined />,
        label: '물품관리',
      },
    ],
  },
  {
    key: 'categories',
    label: '마이페이지',
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
      style={{ height: '100vh', paddingTop: '10px'}}
      
    />
  );
};

export default Sidebar;
