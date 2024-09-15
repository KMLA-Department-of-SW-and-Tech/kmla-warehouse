import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from 'antd';
import "../styles/admin-home.css";
import Headbar from "../components/header";
import Sidebar from "../components/admin/admin-sidebar";

const { Sider, Content } = Layout;


const AdminTeamPage: React.FC = () => {
    return(
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
}

export default AdminTeamPage;