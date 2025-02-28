import React, { useState } from 'react';
import { Form, Input, Button, message, Layout, Typography } from 'antd';
import Sidebar from '../../../components/admin/admin-sidebar';
import Headbar from '../../../components/admin/admin-header'; // Assuming you have a header component like in the EquipmentListPage
import { useNavigate } from 'react-router-dom';
// import authService from '../../../../api/authService';

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminSettingPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
  const navigate = useNavigate();
  
  // Function to handle password change
  const handlePasswordChange = async (values) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message on new attempt
    try {
      // await authService.changePassword(values.currentPassword, values.newPassword);
      message.success('Password changed successfully!');
    } catch (error) {
      console.log(error);
      // If an error occurs, display the error message and prevent the success message from showing
      const responseMessage = error.response?.data || 'Failed to change password. Please try again.';
      setErrorMessage(responseMessage); // Set error message for display in the form
      message.error('Failed to change password.'); // Display error notification
      throw(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
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
    <Layout style={{ minHeight: '100vh' }}>
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className='content'>
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
