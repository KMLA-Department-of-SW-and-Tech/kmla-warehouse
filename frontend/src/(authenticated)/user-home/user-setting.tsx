import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import authService from '../../api/authService';

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
  

  // Function to handle password change
  const handlePasswordChange = async (values) => {
    setLoading(true);
    setErrorMessage(''); // Reset error message on new attempt
    try {
      await authService.changePassword(values.currentPassword, values.newPassword);
      message.success('Password changed successfully!');
    } catch (error) {
      // Capture error message from backend response
      const responseMessage = error.response?.data || 'Failed to change password. Please try again.';
      setErrorMessage(responseMessage); // Set error message
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
    
      
    } catch (error) {
      message.error('Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <Button type="danger" onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </div>
  );
};

export default AccountSettings;
