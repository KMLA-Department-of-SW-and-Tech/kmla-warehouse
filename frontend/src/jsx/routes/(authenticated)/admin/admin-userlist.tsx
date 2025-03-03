import React, { useEffect, useState } from 'react';
import { Button, message, Layout, Typography, Table, Input, Space } from 'antd';
import AdminSidebar from '../../../components/sidebar/admin-sidebar';
import AdminHeader from '../../../components/header/admin-header';
import { useAuth } from "../../../contexts/authContext";
import { CheckOutlined } from "@ant-design/icons";
import userService from "../../../../js/api/userService";
import { GetUser } from "../../../../js/types/User";
import Loading from '../../../components/loading/loading';


const { Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
  

const AdminUserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<GetUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<GetUser[]>([]);
  const [searchText, setSearchText] = useState("");
  const authValue = useAuth();

  useEffect(() => {
    fetchAuthorizedUsers();
  }, []);

  // get the list of unauthorized users
  const fetchAuthorizedUsers = async () => {
    setLoading(true);
    try {
      const unauthorizedUsers = await userService.getAuthorizedUsers(authValue.accessToken);
      const filteredUsers = unauthorizedUsers.filter(user => user.teamName);

      setUsers(filteredUsers);
    } catch (error) {
      message.error("Failed to fetch unauthorized users.");
      console.error(error);
    } finally {
      setLoading(false);
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
      title: "학번", 
      dataIndex: "userStudentNumber", 
      key: "userStudentNumber" 
  },
  ];



  return (
    <Layout>
      <AdminHeader />
      <Layout>
        <Layout className='admin-layout'>
          <Sider className='sidebar'>
            <AdminSidebar />
          </Sider>
          <Content className='admin-content'>
            <Title level={3}>사용자 목록</Title>
            {loading ? (
            <Loading />
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

export default AdminUserList;
