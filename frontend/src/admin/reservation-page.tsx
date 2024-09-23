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
      setData(res.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // MongoDB 데이터를 변환하는 함수
  const transformData = (mongoData: any[]): DataType[] => {
    return mongoData.map(item => ({
      _id: item._id.$oid,
      item: item.item.$oid, // 실제로는 아이템의 이름을 가져오기 위한 추가 요청이 필요할 수 있음
      quantity: parseInt(item.quantity.$numberInt),
      borrower: item.borrower.$oid, // 마찬가지로 실제 팀명을 가져오기 위한 추가 요청이 필요할 수 있음
      borrow_date: dayjs(parseInt(item.borrow_date.$date.$numberLong)).format('YYYY-MM-DD'),
      return_date: dayjs(parseInt(item.return_date.$date.$numberLong)).format('YYYY-MM-DD'),
    }));
  };

  return (
    <Layout className="layout">
      <Headbar />
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="content">
            <Title level={3}>예약현황</Title>
            <Table
              columns={columns}
              dataSource={data || []}
              rowKey="id"  // 고유한 key로 설정
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;
