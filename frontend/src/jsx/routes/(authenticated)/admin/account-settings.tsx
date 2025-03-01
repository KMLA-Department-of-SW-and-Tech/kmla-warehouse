import React, { useState } from 'react';
import { Button, message, Layout, Typography } from 'antd';
import { signUserOut } from '../../../../js/firebase/auth';
import Sidebar from '../../../components/admin/admin-sidebar';
import Headbar from '../../../components/admin/admin-header'; // Assuming you have a header component like in the EquipmentListPage
import { useNavigate } from 'react-router-dom';
import './admin.css';
// import authService from '../../../../api/authService';

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminSettingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signUserOut();
      message.success('Logged out successfully!');
      navigate("/home");
    } catch (error) {
      message.error('Failed to log out. Please try again.');
      throw(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className='layout'>
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content>
            <Title level={3}>마이페이지</Title>
            <Button onClick={handleLogout} loading={loading}>
              Logout
            </Button>
          </Content>
        </Layout>
      </Layout>
      
      
      
    </Layout>
  );
};

export default AdminSettingPage;
