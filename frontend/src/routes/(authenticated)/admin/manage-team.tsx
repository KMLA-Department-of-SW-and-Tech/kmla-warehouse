import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin, message, ConfigProvider, Form, Input, Button, Modal  } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from "../../../components/admin/admin-sidebar";
import './admin.css';
import Headbar from "../../../components/header";
import { teamService, Team, AddTeam } from "../../../api/teamService";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons'; 

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminTeamPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [newTeams, addTeams] = useState<AddTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await teamService.getAll();
      const filteredTeams = response.filter(team => team.status !== "deleted");
      setTeams(filteredTeams);
    } catch (error) {
      message.error('Failed to fetch items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async (newTeam: AddTeam) => {
    try {
      const addedTeam = await teamService.create(newTeam);
      addTeams(prevTeams => [...prevTeams, addedTeam]);
      message.success('Team added successfully');
    } catch (error) {
      message.error('Failed to add team');
      console.error(error);
    }
  };

  const handleUpdateTeam = async (id: string, updatedTeam: Team) => {
    try {
      const updated = await teamService.update(id, updatedTeam);
      setTeams(teams.map(team => (team._id === id ? updated : team)));
      message.success('Team updated successfully');

      setEditableRowKeys(prevKeys => prevKeys.filter(key => key !== id));
      fetchTeams();
    } catch (error) {
      message.error('Failed to update team');
      console.error(error);
    }
  };

  const handleDeleteConfirmation = (id: string) => {
    Modal.confirm({
      title: '팀 삭제 확인',
      content: '이 팀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => handleDeleteTeam(id),
    });
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      await teamService.delete(id);
      setTeams(teams.filter(team => team._id !== id));
      message.success('Team deleted successfully');
    } catch (error) {
      message.error('Failed to delete team');
      console.error(error);
    }
  };

  const columns: ProColumns<Team>[] = [
    {
      title: '팀명',
      dataIndex: 'name',
    },
    {
      title: '생성자',
      dataIndex: 'username',
      editable: false,
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button
          key="editable"
          icon={<EditOutlined />}
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
          type="link"
        >
        </Button>,
        <Button
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleDeleteConfirmation(record._id)}
        type="link"
        danger
      >
      </Button>,
      ],
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <Layout className="layout">
        <Headbar />
        <Layout>
          <Sider>
            <Sidebar />
          </Sider>
          <Layout>
            <Content className="content">
              <Title level={3}>팀관리</Title>

              <Form
                form={form}
                layout="inline"
                onFinish={handleAddTeam}
                style={{ marginBottom: 20 }}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input the username!' }]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input the password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please input the team name!' }]}
                >
                  <Input placeholder="Team Name" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Team
                  </Button>
                </Form.Item>
              </Form>

              {loading ? (
                <Spin />
              ) : (
                <EditableProTable<Team>
                  rowKey="_id"
                  value={teams}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data) => {
                      await handleUpdateTeam(data._id, data as Team);
                    },
                    onChange: setEditableRowKeys,
                    saveText: <Button icon={<SaveOutlined/>}></Button>,
                    cancelText: <Button icon={<CloseOutlined/>}></Button>,
                    actionRender: (row, config, defaultDom) => {
                      const { save, cancel } = defaultDom; 
                      return [save, cancel];
                    },
                    //deleteText: <Button danger icon={<DeleteOutlined/>}></Button>,
                  }}
                  
                  recordCreatorProps={false}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminTeamPage;
