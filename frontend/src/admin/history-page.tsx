import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/admin/admin-sidebar'
import "../styles/admin-home.css";
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;



const AdminHistoryPage: React.FC = () => {

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
          <Content className="content">
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;