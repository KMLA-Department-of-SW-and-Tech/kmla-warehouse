import React, { useState, useEffect } from 'react';
import  { Outlet } from "react-router-dom";
import { Layout }  from 'antd';
import Sidebar from '../components/admin/admin-sidebar'
import "../styles/admin-home.css";
import { itemService, Item } from '../api/itemService';

const { Header, Content, Sider } = Layout;


const AdminHome: React.FC = () => {
  return (
    <Layout className="layout">
      <Header className="header">
        <h2>KMLA Storage</h2>
      </Header>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="content" style={{ padding: '24px' }}>
            {/* 여기서 자식 컴포넌트(Home, Reservation, History)가 동적으로 렌더링됨 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
  
  export default AdminHome;