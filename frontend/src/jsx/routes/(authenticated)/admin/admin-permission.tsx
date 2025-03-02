import React, { useEffect, useState } from 'react';
import { Button, message, Layout, Typography, Table, Spin, Input, Space } from 'antd';
import Sidebar from '../../../components/sidebar/admin-sidebar';
import Headbar from '../../../components/header/admin-header';
import { useAuth } from "../../../contexts/authContext";
import { CheckOutlined } from "@ant-design/icons";
import userService from "../../../../js/api/userService";
import { GetUser } from "../../../../js/types/User";


const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
  

const AdminPermissionPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<GetUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<GetUser[]>([]);
  const [searchText, setSearchText] = useState("");
  const authValue = useAuth();

  useEffect(() => {
    fetchUnauthorizedUsers();
  }, []);

  // get the list of unauthorized users
  const fetchUnauthorizedUsers = async () => {
    setLoading(true);
    try {
      const unauthorizedUsers = await userService.getUnauthorizedUsers(authValue.accessToken);
      const filteredUsers = unauthorizedUsers.filter(user => user.teamName);

      setUsers(filteredUsers);
    } catch (error) {
      message.error("Failed to fetch unauthorized users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // permit an unauthorized user
  const handleAuthorizeUser = async (id: string) => {
    try {
      await userService.authorizeUserById(id, authValue.accessToken);
      message.success("User authorized successfully.");
      setUsers(users.filter(user => user._id !== id)); // delete after authorization
    } catch (error) {
      message.error("Failed to authorize user.");
      console.error(error);
    }
  };

  // search
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = users.filter(user =>
        (user.userName && user.userName.toLowerCase().includes(value.toLowerCase())) ||
        (user.teamName && user.teamName.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  const columns = [
    { 
        title: "팀명",
        dataIndex: "teamName", 
        key: "teamName" 
    },
    { 
        title: "사용자명", 
        dataIndex: "userName", 
        key: "userName" 
    },
    {
      title: "승인",
      key: "authorize",
      render: (_, record: GetUser) => (
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
                <Table 
                  columns={columns} 
                  dataSource={users} 
                  rowKey="_id" 
                  className='admin-table'
                />
            )}

          </Content>
        </Layout>
      </Layout>
      
      
      
    </Layout>
  );
};

export default AdminPermissionPage;
