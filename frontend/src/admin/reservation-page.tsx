import React, { useState, useEffect } from 'react';
import { Layout, Table, Typography } from 'antd';
import { TableProps } from 'antd';
import Sidebar from '../components/admin/admin-sidebar';
import "../styles/admin-home.css";
import Headbar from "../components/header";
import axios from 'axios';
import dayjs from 'dayjs';

const { Content, Sider } = Layout;
const { Title } = Typography;

interface DataType {
  item: string;
  quantity: number;
  borrower: string;
  borrow_date: string;
  return_date: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '팀명',
    dataIndex: 'borrower',
    key: 'borrower',
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
    title: '대여일',
    dataIndex: 'borrow_date',
    key: 'borrow_date',
  },
  {
    title: '반납일',
    dataIndex: 'return_date',
    key: 'return_date',
  },
];

const AdminHistoryPage: React.FC = () => {
  const [data, setData] = useState<DataType[] | null>(null);
  
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/borrow-history/list");
      const rawdata = res.data;

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

      const processedData = await Promise.all(
        rawdata.map(async (element: any) => {
          const borrowerRes = await axios.get("/api/team/" + element.borrower);
          const itemRes = await axios.get("/api/item/" + element.item);
          
          return {
            item: itemRes.data.item.name,
            quantity: element.quantity,
            borrower: borrowerRes.data.name,
            borrow_date: dayjs(element.borrow_date).format('YYYY-MM-DD'),
            return_date: dayjs(element.return_date).format('YYYY-MM-DD'),
          };
        })
      );

      setData(processedData);

    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
