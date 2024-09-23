import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import { Item, itemService } from '../api/itemService'

const { Sider, Content } = Layout;

const AdminEquipmentPage: React.FC = () => {
    return(
        <Layout className="layout">
            <Headbar />
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
}


export default AdminEquipmentPage;