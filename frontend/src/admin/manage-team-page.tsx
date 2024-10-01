import React, { useState } from "react";
import { Layout, Table, Button, Typography, Modal, Input } from 'antd';
import "../styles/admin-home.css";
import Headbar from "../components/header";
import Sidebar from "../components/admin/admin-sidebar";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title } = Typography;

interface Team {
  id: string;
  name: string;
}

const AdminTeamPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team[] | null>(null); // 현재 편집 중인 팀
  const [teamData, setTeamData] = useState<Team[]>([
    {
      id: "1",
      name: "유경",
    },
  ]);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Actions",
      render: (record: Team) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTeam(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTeam(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddTeam = () => {
    const randomNumber = parseInt((Math.random() * 1000).toString());
    const newTeam = {
      id: randomNumber.toString(),
      name: "kwagibu" + randomNumber,
    };
    setTeamData((prev) => {
      return [...prev, newTeam];
    });
  };

  const onDeleteTeam = (record: Team) => {
    Modal.confirm({
      title: "Are you sure you want to delete this team?",
      onOk: () => {
        setTeamData((prev) => {
          return prev.filter((team) => team.id !== record.id);
        });
      },
    });
  };

  const onEditTeam = (record: Team) => {
    setIsEditing(true);
    setEditingTeam({ ...record });
  };

  const resetEditing=()=>{
    setIsEditing(false);
    setEditingTeam(null);

  }

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
            <Button onClick={onAddTeam}>Add a new Team</Button>
            <Table columns={columns} dataSource={teamData} rowKey="id" />
            <Modal
              title="Edit Team"// 상태 변수 수정
              okText="Save"
              onCancel={() => {
                resetEditing()
              }}
              onOk={() => {
                setTeamData((pre)=>{
                    return pre.map(student=>{
                        if(student.id===editingTeam.id){
                            return editingTeam
                        }else{
                            return student;
                        }
                    })
                })
                resetEditing()
              }}
            >
              <Input value={editingTeam?.name} onChange={(e)=>{
                setEditingTeam((pre)=>{
                    return {...pre, name: e.target.value}
                })
              }}/>
              {/* 여기서 팀 정보 편집 UI를 추가할 수 있습니다 */}
              {editingTeam && (
                <>
                  <p>ID: {editingTeam.id}</p>
                  <p>Name: {editingTeam.name}</p>
                </>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminTeamPage;
