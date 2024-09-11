
import { Typography, Table, Row, Col, Card } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
const { Title } = Typography

import { PageLayout } from "../../layouts/page-layout.tsx";
import React from "react";


export default function HomePage() {
  

  
 

  const borrowingHistoryColumns = [
    {
      title: 'Equipment',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
    },

  ]

  const reservationColumns = [
    {
      title: 'Equipment',
      dataIndex: ['equipment', 'name'],
      key: 'equipment',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'approved' ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Row justify="center">
        <Col span={24}>
          <Title level={2}>My Borrowing History</Title>
        
          <Card>
            <Table
              
              columns={borrowingHistoryColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Title level={2}>My Current Reservations</Title>
        
          <Card>
            <Table
             
              columns={reservationColumns}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
