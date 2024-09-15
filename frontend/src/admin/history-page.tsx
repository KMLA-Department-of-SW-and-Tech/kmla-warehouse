import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Table, Typography } from 'antd';
import { TableProps } from 'antd';
import Sidebar from '../components/admin/admin-sidebar'
import "../styles/admin-home.css";
import Headbar from "../components/header"
import { itemService, Item } from '../api/itemService';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface DataType {
  key: string;
  teamName: string;
  requestedItem: string;
  quantity: number;
  received: string;
}

const data = [
  {
    key: '1',
    teamName: '창창이와 친구들',
    requestedItem: '에어프라이기',
    quantity: 2,
    received: 'O',
  },
  {
    key: '2',
    teamName: '삐용삐용',
    requestedItem: 'chatGPT Plus',
    quantity: 1,
    received: 'X',
  },
  {
    key: '3',
    teamName: '하이탑',
    requestedItem: '3D 프린터',
    quantity: 1,
    received: 'O',
  },
  {
    key: '4',
    teamName: '모험가들',
    requestedItem: '드론',
    quantity: 3,
    received: 'X',
  },
  {
    key: '5',
    teamName: '아이디어팡팡',
    requestedItem: '라즈베리 파이',
    quantity: 4,
    received: 'O',
  },
  {
    key: '6',
    teamName: '개발자들',
    requestedItem: '노트북',
    quantity: 2,
    received: 'O',
  },
  {
    key: '7',
    teamName: '해커톤팀',
    requestedItem: '키보드',
    quantity: 5,
    received: 'X',
  },
  {
    key: '8',
    teamName: '탐험대',
    requestedItem: '카메라 장비',
    quantity: 1,
    received: 'O',
  },
  {
    key: '9',
    teamName: '네모의꿈',
    requestedItem: '3D 펜',
    quantity: 3,
    received: 'O',
  },
  {
    key: '10',
    teamName: '비전팀',
    requestedItem: '프로젝터',
    quantity: 1,
    received: 'X',
  },
  {
    key: '11',
    teamName: '창의공작소',
    requestedItem: '납땜 도구',
    quantity: 2,
    received: 'O',
  },
  {
    key: '12',
    teamName: '기술지원팀',
    requestedItem: '전동 드릴',
    quantity: 1,
    received: 'X',
  },
];

const columns: TableProps<DataType>['columns'] = [
  {
    title: '팀명',
    dataIndex: 'teamName',
    key: 'teamName',
  },
  {
    title: '신청물품',
    dataIndex: 'requestedItem',
    key: 'requestedItem',
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '수령여부',
    dataIndex: 'received',
    key: 'received',
  },
];

const AdminHistoryPage: React.FC = () => {
  // const [data, setData] = useState<Item[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const items = await itemService.getAll();
  //       setData(items);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);



  return (
    <Layout className="layout">
      <Headbar/>
      <Layout>
        <Sider>
          <Sidebar/>
        </Sider>
        <Layout>
          <Content className="content">
            <Title level={3}>예약현황</Title>
            <Table
              dataSource={data}
              columns={columns}
              //loading={loading}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;