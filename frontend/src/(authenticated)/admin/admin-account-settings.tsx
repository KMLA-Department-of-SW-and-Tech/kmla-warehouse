import React, { useState } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import Sidebar from '../../components/admin/admin-sidebar';
import Headbar from '../../components/header'; // Assuming you have a header component like in the EquipmentListPage
import { useNavigate } from 'react-router-dom';
import authService from '../../api/authService';

const { Sider, Content } = Layout;

const AdminSettingPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
  const navigate = useNavigate();
  
  // Function to handle password change
  const handlePasswordChange = async (values) => {
    setLoading(true);
    setErrorMessage(""); // Reset error message on new attempt
    try {
      await authService.changePassword(values.currentPassword, values.newPassword);
      message.success('Password changed successfully!');
    } catch (error) {
      console.log(error);
      // If an error occurs, display the error message and prevent the success message from showing
      const responseMessage = error.response?.data || 'Failed to change password. Please try again.';
      setErrorMessage(responseMessage); // Set error message for display in the form
      message.error('Failed to change password.'); // Display error notification
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
      navigate("/kmla-warehouse/home");
    } catch (error) {
      message.error('Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headbar /> {/* Header component */}
      <Sider
        width={250}
        style={{
          background: '#fff',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 64, // If you have a fixed header
        }}
      >
        <Sidebar /> {/* Sidebar component */}
      </Sider>
      
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ padding: '40px', marginTop: '64px', width: 'calc(100vw - 250px)' }}>
          <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Account Settings</h2>

            <Form layout="vertical" onFinish={handlePasswordChange}>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please enter your current password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please enter your new password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmNewPassword"
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* Display error message */}
              {errorMessage && (
                <div style={{ color: 'red', marginBottom: '16px' }}>
                  {errorMessage}
                </div>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Change Password
                </Button>
              </Form.Item>
            </Form>

            <Button onClick={handleLogout} loading={loading}>
              Logout
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminSettingPage;
