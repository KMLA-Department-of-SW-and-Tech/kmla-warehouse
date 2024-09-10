import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthentication } from '@web/modules/authentication';
import { useSnackbar } from 'notistack';
import { Api, Model } from '@web/domain';
import { PageLayout } from '../layouts/page-layout';

const { Title } = Typography;

export default function EquipmentListPage() {
  const navigate = useNavigate(); // React Router의 useNavigate 사용
  const params = useParams(); // React Router의 useParams 사용

  const authentication = useAuthentication();
  const userId = authentication.user?.id;

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [equipmentList, setEquipmentList] = useState<Model.Equipment[]>([]);

  useEffect(() => {
    if (!authentication.isLoggedIn) {
      navigate('/home'); // 로그인하지 않으면 홈 페이지로 이동
      return;
    }

    const fetchEquipment = async () => {
      try {
        const equipmentsFound = await Api.Equipment.findMany();
        setEquipmentList(equipmentsFound);
      } catch (error) {
        enqueueSnackbar('Failed to fetch equipment', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [authentication.isLoggedIn, navigate]);

  const handleViewDetails = (equipmentId: string) => {
    navigate(`/equipment/${equipmentId}`); // 해당 장비의 상세 페이지로 이동
  };

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Available Equipment</Title>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {equipmentList?.map(equipment => (
            <Col xs={24} sm={12} md={8} lg={6} key={equipment.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={equipment.name}
                    src={equipment.photoUrl || '/default-equipment.jpg'}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  <span
                    key="view"
                    onClick={() => handleViewDetails(equipment.id)}
                    style={{ cursor: 'pointer', color: '#1890ff' }}
                  >
                    빌리러 가기
                  </span>,
                ]}
                style={{ width: '100%', height: '300px' }}
              >
                <Card.Meta
                  title={equipment.name}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  );
}
