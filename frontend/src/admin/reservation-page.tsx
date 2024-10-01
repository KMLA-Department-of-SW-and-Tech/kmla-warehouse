import React, { useState, useEffect } from 'react';
import { Layout, Table, Typography, TableProps } from 'antd';
import Sidebar from '../components/admin/admin-sidebar';
import "../styles/admin-home.css";
import Headbar from "../components/header";


const { Content, Sider } = Layout;
const { Title } = Typography;

interface DataType {
  item: string;
  quantity: number;
  type: string;
  timestamp: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '팀명',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: '신청물품',
    dataIndex: 'item',
    key: 'item',
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '상태',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '시간',
    dataIndex: "timestamp", 
    key: 'timestamp',

  }
];

const AdminHistoryPage: React.FC = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  

  return (
    <Layout className="layout">
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="content">
            <Title level={3}>신청현황</Title>
            <Table
              columns={columns}
              dataSource={data || []}
              rowKey="id"
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;


/*
      rawdata.forEach(async (element, index) => {
        const borrower = await axios.get("/api/team/" + element.borrower);
        rawdata[index].borrower = borrower.data.name;
        const item = await axios.get("/api/item/" + element.item);
        rawdata[index].item = item.data.item.name;
      });
      */
      //console.log(rawdata.data.item.name)
      //setData(rawdata);