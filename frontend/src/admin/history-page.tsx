import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Card, Button, Row, Col } from 'antd';
import Sidebar from '../components/admin/sidebar';

const { Sider, Content } = Layout;

interface Reservation {
  id: number;
  name: string;
  status: string;
  dateRange: string;
}

const AdminHistoryPage: React.FC = () => {
  const [reservations] = useState<Reservation[]>([
    { id: 1, name: '전자물품1', status: '수령전', dateRange: '24/09/01~24/10/01' },
    { id: 2, name: '전자물품2', status: '사용중', dateRange: '24/08/20~24/08/23' },
    { id: 3, name: '전자물품3', status: '반납완료', dateRange: '24/04/12~24/04/22' },
  ]);

  return (
    <Layout>
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <h2>예약현황</h2>
          <Button.Group>
            <Button type="default">전체</Button>
            <Button type="default">수령전</Button>
            <Button type="default">사용중</Button>
            <Button type="default">반납완료</Button>
          </Button.Group>
          <div style={{ marginTop: '20px' }}>
            <Row gutter={[16, 16]}>
              {reservations.map((item) => (
                <Col span={8} key={item.id}>
                  <Card title={item.name}>
                    <p>상태: {item.status}</p>
                    <p>예약날짜: {item.dateRange}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHistoryPage;
