import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout, Spin, Modal } from 'antd';
import authService from '../../../api/authService';
import Sidebar from '../../../components/user/user-sidebar';
import Headbar from '../../../components/header'; 
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const AccountSettings = () => {
  const [loading, setLoading] = useState(false); // minor elements loading
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  
  const handlePasswordChange = async (values) => {
    setLoading(true);
    setErrorMessage(""); 
    try {
      await authService.changePassword(values.currentPassword, values.newPassword);
      message.success('비밀번호가 성공적으로 변경되었습니다');
    } catch (error) {
      console.log(error);
      
      const responseMessage = error.response?.data || '비밀번호를 변경하는데 실패하였습니다. 다시 시도해 주세요.';
      setErrorMessage(responseMessage);
      message.error('비밀번호를 변경하는데 실패하였습니다.'); 
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      message.success('로그아웃이 성공적으로 완료되었습니다.');
      navigate("/home");
    } catch (error) {
      message.error('로그아웃하는데 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Headbar />
      <Sider
        width={250}
        style={{
          background: '#fff',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 64,
        }}
      >
      <Sidebar /> 
      </Sider>
        <Layout style={{ marginLeft: 250 }}>
          <Content style={{ padding: '40px', marginTop: '64px', width: 'calc(100vw - 250px)' }}>
            <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
              <h2>계정 설정</h2>

              <Form layout="vertical" onFinish={handlePasswordChange}>
                <Form.Item
                  label="현재 비밀번호"
                  name="currentPassword"
                  rules={[{ required: true, message: '현재 비밀번호를 입력해주세요' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="새 비밀번호"
                  name="newPassword"
                  rules={[{ required: true, message: '새 비밀번호를 입력해주세요' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="새 비밀번호 확인"
                  name="confirmNewPassword"
                  rules={[
                    { required: true, message: '새 비밀번호를 다시 한 번 입력해주세요' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('새 비밀번호 두 개가 일치하지 않습니다.'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {errorMessage && (
                  <div style={{ color: 'red', marginBottom: '16px' }}>
                    {errorMessage}
                  </div>
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    비밀번호 변경
                  </Button>
                </Form.Item>
              </Form>


              <Button onClick={handleLogout} loading={loading}>
                로그아웃
              </Button>
            </div>
          </Content>
        </Layout>
    </Layout>
  );
};

export default AccountSettings;
