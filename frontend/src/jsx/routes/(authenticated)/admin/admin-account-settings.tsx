import React, { useState } from 'react';
import { Button, message, Layout, Typography } from 'antd';
import { signUserOut } from '../../../../js/firebase/auth';
import Sidebar from '../../../components/sidebar/admin-sidebar';
import Headbar from '../../../components/header/admin-header'; // Assuming you have a header component like in the EquipmentListPage
import { useNavigate } from 'react-router-dom';


const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminAccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      signUserOut();
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
    <Layout>
      <Headbar />
      <Layout>
        <Layout className='admin-layout'>
          <Sider className='sidebar'>
            <Sidebar />
          </Sider>
          <Content className='admin-content'>
            <Title level={3}>로그아웃</Title>
            <Button 
              onClick={handleLogout} 
              loading={loading}
              className='admin-logout-btn'>
              Logout
            </Button>
          </Content>
        </Layout>
      </Layout>
      
      
      
    </Layout>
  );
};

export default AdminAccountSettings;
