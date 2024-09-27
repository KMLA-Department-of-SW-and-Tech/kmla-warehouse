import React, { useEffect, useState } from "react";
import { Layout, Typography } from 'antd';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import EditEquipment from "../components/admin/admin-edit-equipment-table";

const { Sider, Content } = Layout;
const { Title } = Typography;

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
                        <Title level={3}>물품관리</Title>
                        <EditEquipment/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}


export default AdminEquipmentPage;