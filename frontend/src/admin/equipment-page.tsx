//equipment-page
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Layout, Typography, TableProps, Table } from 'antd';
import Sidebar from "../components/admin/admin-sidebar";
import '../styles/admin-home.css';
import Headbar from "../components/header"
import EditEquipment from "../components/admin/admin-edit-equipment-table";

const { Sider, Content } = Layout;
const { Title } = Typography;

interface DataType {
    name: string;
    description: string;
    tags: string;
    quantity: number;
    location: string;
    photo: HTMLImageElement;
    category: string;
  }
  
  /*
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '물품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: '태그',
        dataIndex: 'tag', 
        key: 'tag',
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '위치',
      dataIndex: 'borrow_date',
      key: 'borrow_date',
    },
    {
      title: '편집하기',
      dataIndex: 'return_date',
      key: 'return_date',
    },
  ];

  */
const AdminEquipmentPage: React.FC = () => {
    const [data, setData] = useState<DataType[] | null>(null);


    const fetchData = async () => {
        try {
          const res = await axios.get("/api/item/");
    
          const processedData = await Promise.all(
            res.data.map(async (element: any) => {
              
              return {
                name: element.name,
                description: element.description,
                tags: element.tags,
                quantity: element.quantity,
                location: element.location, 
                photo: element.photo, 
                category: element.category,
                
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
    return(
        <Layout className="layout">
            <Headbar />
            <Layout>
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Content className="content">
                        <Title level={3}>물품관리</Title>
                        <EditEquipment/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}


export default AdminEquipmentPage;