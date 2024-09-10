// 필요한 React와 Ant Design, 기타 라이브러리들 import
import React from 'react';
import { useEffect, useState } from 'react' // React hook (useEffect, useState) 사용
import { Typography, Card, Row, Col, Spin } from 'antd' // Ant Design의 컴포넌트 (Typography, Card, Row, Col, Spin) import
const { Title } = Typography // Typography 컴포넌트에서 Title만 추출
import { useAuthentication } from '@web/modules/authentication' // 사용자 인증 관련 custom hook import
import { useSnackbar } from 'notistack' // 알림 메시지 표시를 위한 hook import
import { useRouter, useParams } from 'next/navigation' // Next.js 라우터 및 URL 파라미터를 가져오는 hook import
import { Api, Model } from '@web/domain' // API 호출 및 데이터 모델 관련 모듈 import
import { PageLayout } from '../layouts/page-layout' 

// 장비 목록 페이지 컴포넌트
export default function EquipmentListPage() {
  // Next.js 라우터 및 파라미터를 가져옴
  const router = useRouter()
  const params = useParams<any>()
  
  // 사용자 인증 관련 정보를 가져옴
  const authentication = useAuthentication()
  const userId = authentication.user?.id // 사용자 ID 추출
  
  // Snackbar hook으로 알림 메시지를 띄우기 위한 설정
  const { enqueueSnackbar } = useSnackbar()
  
  // 상태 관리: 로딩 상태와 장비 목록 상태를 관리
  const [loading, setLoading] = useState(true) // 페이지 로딩 상태
  const [equipmentList, setEquipmentList] = useState<Model.Equipment[]>([]) // 장비 목록 상태

  // 컴포넌트가 처음 렌더링될 때와 authentication.isLoggedIn이 변경될 때마다 실행
  useEffect(() => {
    // 사용자가 로그인하지 않았으면 홈으로 리다이렉트
    if (!authentication.isLoggedIn) {
      router.push('/home') // 로그인하지 않으면 홈 페이지로 이동
      return
    }

    // 장비 목록을 API에서 가져오는 비동기 함수 정의
    const fetchEquipment = async () => {
      try {
        // API 호출하여 장비 목록 가져옴
        const equipmentsFound = await Api.Equipment.findMany()
        setEquipmentList(equipmentsFound) // 장비 목록 상태 업데이트
      } catch (error) {
        // 오류 발생 시 알림 메시지 출력
        enqueueSnackbar('Failed to fetch equipment', { variant: 'error' })
      } finally {
        // 로딩 상태 종료
        setLoading(false)
      }
    }

    // 장비 목록 가져오는 함수 호출
    fetchEquipment()
  }, [authentication.isLoggedIn, router]) // authentication.isLoggedIn과 router가 변경될 때마다 실행

  // 특정 장비의 세부 정보를 보려고 할 때 호출되는 함수
  const handleViewDetails = (equipmentId: string) => {
    router.push(`/equipment/${equipmentId}`) // 해당 장비의 상세 페이지로 이동
  }

  return (
    <PageLayout layout="narrow"> {/* 페이지 레이아웃 설정 */}
      <Title level={2}>Available Equipment</Title> {/* 제목 표시 */}
      
      {/* 로딩 중일 때는 Spin 컴포넌트로 로딩 애니메이션 표시 */}
      {loading ? (
        <Spin size="large" /> {/* 큰 사이즈의 로딩 스피너 */}
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}> {/* 16px의 간격을 가진 행 */}
          {/* 장비 목록을 반복 렌더링 */}
          {equipmentList?.map(equipment => (
            <Col xs={24} sm={12} md={8} lg={6} key={equipment.id}> {/* 다양한 화면 크기에 맞는 그리드 레이아웃 */}
              <Card
                hoverable // 카드에 hover 효과 적용
                cover={
                  <img
                    alt={equipment.name} // 장비 이름을 alt로 설정
                    src={equipment.photoUrl || '/default-equipment.jpg'} // 장비 이미지 또는 기본 이미지 사용
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }} // 이미지 스타일 설정
                  />
                }
                actions={[
                  <span
                    key="view"
                    onClick={() => handleViewDetails(equipment.id)} // 클릭 시 해당 장비의 상세 페이지로 이동
                    style={{ cursor: 'pointer', color: '#1890ff' }} // 텍스트를 링크처럼 보이도록 설정
                  >
                    빌리러 가기
                  </span>,
                ]}
                style={{ width: '100%', height: '300px' }} // 카드 크기 설정
              >
                {/* 장비 이름과 위치를 카드 메타 정보로 표시 */}
                <Card.Meta
                  title={equipment.name} // 장비 이름
                  // description={equipment.location} // 장비 위치 (주석 처리됨)
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', // 텍스트가 너무 길 경우 생략 표시
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
