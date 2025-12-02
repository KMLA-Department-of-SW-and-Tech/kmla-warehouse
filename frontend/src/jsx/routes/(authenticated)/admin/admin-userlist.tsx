import { useEffect, useState } from "react";

import { message, Layout, Typography, Table } from "antd";
import AdminHeader from "../../../components/header/admin-header";
import AdminSidebar from "../../../components/sidebar/admin-sidebar";
import Loading from "../../../components/loading/loading";

import { useAuth } from "../../../contexts/authContext";
import userService from "../../../../js/api/userService";
import { GetUser } from "../../../../js/types/User";

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminUserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<GetUser[]>([]);
  const authValue = useAuth();

  useEffect(() => {
    fetchAuthorizedUsers();
  }, []);

  // get the list of unauthorized users
  const fetchAuthorizedUsers = async () => {
    setLoading(true);
    try {
      const authorizedUsers = await userService.getAuthorizedUsers(
        authValue.accessToken
      );
      const nta = await userService.getNoTeamNameAvailable();
      const filteredUsers = authorizedUsers.filter((user) => user.userType === "User");
      setUsers(filteredUsers.map(item => item.teamName === nta ? { ...item, teamName: "없음" } : item));
    } catch (error) {
      message.error("승인된 유저를 불러오는 데 실패했습니다.");
      console.error(
        "Failed to fetch authorized users in admin userlist: ",
        error
      );
    } finally {
      setLoading(false);
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
      title: "학번",
      dataIndex: "userStudentNumber",
      key: "userStudentNumber",
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
            <Title level={3}>사용자 목록</Title>
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

export default AdminUserList;
