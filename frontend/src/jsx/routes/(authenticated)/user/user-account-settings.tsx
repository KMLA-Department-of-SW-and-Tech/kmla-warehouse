


import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signUserOut } from '../../../../js/firebase/auth';
import Sidebar from '../../../components/sidebar/user-sidebar';
import Headbar from '../../../components/header/header';
import './user-account-settings.css';

const { Sider, Content } = Layout;

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signUserOut();
      message.success('로그아웃이 성공적으로 완료되었습니다.');
      navigate("/home");
    } catch (error) {
      message.error('로그아웃하는데 실패하였습니다. 다시 시도해주세요.');
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // const handlePasswordChange = async (values) => {
  //   setLoading(true);
  //   setErrorMessage(""); 
  //   try {
  //     // await authService.changePassword(values.currentPassword, values.newPassword);
  //     message.success('비밀번호가 성공적으로 변경되었습니다');
  //   } catch (error) {
  //     console.log(error);
      
  //     const responseMessage = error.response?.data || '비밀번호를 변경하는데 실패하였습니다. 다시 시도해 주세요.';
  //     setErrorMessage(responseMessage);
  //     message.error('비밀번호를 변경하는데 실패하였습니다.'); 

  //     throw(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout className="layout">
      <Headbar />
      <Sider className="sidebar">
        <Sidebar />
      </Sider>
      <Layout className="content-layout">
        <Content className="content">
          <div className="form-container">
            <h2>계정 설정</h2>

            <Form layout="vertical" onFinish={() => {}}>
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


              {errorMessage && <div className="error-message">{errorMessage}</div>}

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