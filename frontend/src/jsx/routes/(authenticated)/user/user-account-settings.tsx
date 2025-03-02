


import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signUserOut } from '../../../../js/firebase/auth';
import Sidebar from '../../../components/sidebar/user-sidebar';
import Headbar from '../../../components/header/user-header.tsx';
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

  return (
    <Layout className="layout">
      <Headbar />
      <Sider className="sidebar">
        <Sidebar />
      </Sider>
      <Layout className="content-layout">
        <Content className="content">
          <div className="form-container">
            <h2>계정 정보 수정</h2>

            

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