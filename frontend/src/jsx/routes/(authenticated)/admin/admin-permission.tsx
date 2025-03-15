import React, { useEffect, useState } from "react";

import { Button, message, Layout, Typography, Table, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import AdminHeader from "../../../components/header/admin-header";
import AdminSidebar from "../../../components/sidebar/admin-sidebar";
import Loading from "../../../components/loading/loading";

import { useAuth } from "../../../contexts/authContext";
import userService from "../../../../js/api/userService";
import { GetUser } from "../../../../js/types/User";

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminPermission = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<GetUser[]>([]);
  const authValue = useAuth();

  useEffect(() => {
    fetchUnauthorizedUsers();
  }, []);

  // get the list of unauthorized users
  const fetchUnauthorizedUsers = async () => {
    setLoading(true);
    try {
      const unauthorizedUsers = await userService.getUnauthorizedUsers(
        authValue.accessToken
      );
      const nta = await userService.getNoTeamNameAvailable();
      const filteredUsers = unauthorizedUsers.filter((user) => user.teamName !== nta);
      setUsers(filteredUsers);
    } catch (error) {
      message.error("비승인 유저를 불러오는 데 실패했습니다.");
      console.error(
        "Failed to fetch unauthorized users in admin permission: ",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // permit an unauthorized user
  const handleAuthorizeUser = async (id: string) => {
    try {
      await userService.authorizeUserById(id, authValue.accessToken);
      message.success("성공적으로 유저를 승인했습니다.");
      setUsers(users.filter((user) => user._id !== id)); // delete after authorization
    } catch (error) {
      message.error("유저를 승인하는 데 실패했습니다.");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "팀명",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "사용자명",
      dataIndex: "userName",
      key: "userName",
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
      <AdminHeader />
      <Layout>
        <Layout className="admin-layout">
          <Sider className="sidebar">
            <AdminSidebar />
          </Sider>
          <Content className="admin-content">
            <Title level={3}>가입승인</Title>
            {loading ? (
              <Loading />
            ) : (
              <Table
                columns={columns}
                dataSource={users}
                rowKey="_id"
                className="admin-table"
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPermission;
