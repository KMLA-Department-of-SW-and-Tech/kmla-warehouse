import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, HistoryOutlined } from '@ant-design/icons';

const Sidebar: React.FC = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100vh', borderRight: 0 }}
      
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        홈화면
      </Menu.Item>
      <Menu.ItemGroup key="categories" title="카테고리">
        <Menu.Item key="all">전체보기</Menu.Item>
        <Menu.Item key="electronics">전자부품</Menu.Item>
        <Menu.Item key="measuring">측정기기</Menu.Item>
        <Menu.Item key="tools">공구</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup key="mypage" title="마이페이지">
        <Menu.Item key="favorite">즐겨찾기</Menu.Item>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          예약현황
        </Menu.Item>
        <Menu.Item key="history" icon={<HistoryOutlined />}>
          히스토리
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default Sidebar;
