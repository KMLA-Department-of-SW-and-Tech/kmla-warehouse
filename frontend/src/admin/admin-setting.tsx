import React, { useState, useEffect } from 'react';
import { Layout }  from 'antd';
import Sidebar from '../components/admin/admin-sidebar'
import "../styles/admin-home.css";
import Headbar from '../components/header';
import { itemService, Item } from '../api/itemService';

const { Content, Sider } = Layout;


const AdminSettingPage: React.FC = () => {
  return (
    <Layout className="layout">
      <Headbar/>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="content">
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
  
  export default AdminSettingPage;