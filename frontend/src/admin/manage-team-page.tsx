import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin, message } from 'antd';
import { EditableProTable, ProColumns } from '@ant-design/pro-components';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import { teamService, Team } from "../api/teamService";

const { Sider, Content } = Layout;
const { Title } = Typography;


const AdminTeamPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await teamService.getAll(); 
        setTeams(response);
      } catch (error) {
        message.error('Failed to fetch items');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleAddTeam = async (newTeam: Team) => {
    try {
      const addedTeam = await teamService.create(newTeam);
      setTeams([...teams, addedTeam]);
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
    } catch (error) {
      message.error('Failed to update team');
      console.error(error);
    }
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
      title: 'Actions',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={() => handleDeleteTeam(record._id)} 
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <Layout className="layout">
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="content">
            <Title level={3}>팀관리</Title>
            {loading ? (
              <Spin />
            ) : (
              <>
                <EditableProTable<Team>
                  rowKey="id"
                  value={teams}
                  columns={columns}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                      if (!data._id) {
                        await handleAddTeam(data as Team);
                      } else {
                        await handleUpdateTeam(data._id, data as Team);
                      }
                    },
                    onChange: setEditableRowKeys,
                  }}
                  recordCreatorProps={{
                    position: 'bottom',
                    record: () => ({
                      _id: (Math.random() * 1000000).toString(),
                      name: '',
                    }),
                  }}
                />
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminTeamPage;
