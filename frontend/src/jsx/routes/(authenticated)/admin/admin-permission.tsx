import React, { useEffect, useState } from 'react';
import { Button, message, Layout, Typography, Table, Spin } from 'antd';
import { signUserOut } from '../../../../js/firebase/auth';
import Sidebar from '../../../components/sidebar/admin-sidebar';
import Headbar from '../../../components/header/admin-header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/authContext";
import { CheckOutlined } from "@ant-design/icons";
import { userService } from "../../../../js/api/userService";


const { Sider, Content } = Layout;
const { Title } = Typography;

interface UnauthorizedUser {
    _id: string;
    username: string;
    name: string;
  }
  

const AdminPermissionPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UnauthorizedUser[]>([]);
  const authValue = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnauthorizedUsers();
  }, []);

  // get the list of unauthorized users
  const fetchUnauthorizedUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getUnauthorizedUsers(authValue.accessToken);
      setUsers(response.data);
    } catch (error) {
      message.error("Failed to fetch unauthorized users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // permite an unauthorized user
  const handleAuthorizeUser = async (id: string) => {
    try {
      await userService.authorizeUserById(
        `/api/user/unauth-list/${id}`,
        { headers: { Authorization: `Bearer ${authValue.accessToken}` } }
      );
      message.success("User authorized successfully.");
      setUsers(users.filter(user => user._id !== id)); // 승인된 사용자 제거
    } catch (error) {
      message.error("Failed to authorize user.");
      console.error(error);
    }
  };

  const columns = [
    { title: "사용자명", dataIndex: "username", key: "username" },
    { title: "이름", dataIndex: "name", key: "name" },
    {
      title: "승인",
      key: "authorize",
      render: (_, record: UnauthorizedUser) => (
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => handleAuthorizeUser(record._id)}
        >
          승인
        </Button>
      ),
    },
  ];



  return (
    <Layout>
      <Headbar />
      <Layout>
        <Layout className='admin-layout'>
          <Sider className='sidebar'>
            <Sidebar />
          </Sider>
          <Content className='admin-content'>
            <Title level={3}>가입승인</Title>
            {loading ? (
            <Spin />
            ) : (
                <Table columns={columns} dataSource={users} rowKey="_id" />
            )}

          </Content>
        </Layout>
      </Layout>
      
      
      
    </Layout>
  );
};

export default AdminPermissionPage;
