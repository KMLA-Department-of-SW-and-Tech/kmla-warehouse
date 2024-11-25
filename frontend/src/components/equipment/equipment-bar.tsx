import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge, Modal } from 'antd';
import {
  AppstoreOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons';

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [redirectPath, setRedirectPath] = useState<string | null>(null); // 이동 경로 저장

  const items1: MenuProps['items'] = [
    {
      key: 'categories',
      label: '카테고리',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/home',
          icon: <AppstoreOutlined />,
          label: '전체보기',
        },
      ],
    },
    {
      key: 'mypage',
      label: '마이페이지',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/reservation-status',
          icon: (
            <Badge size="small">
              <HistoryOutlined />
            </Badge>
          ),
          label: '예약현황',
        },
        {
          key: 'kmla-warehouse/account-settings',
          icon: <UserOutlined />,
          label: '계정설정',
        },
      ],
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    // 홈 페이지는 로그인 없이도 접근 가능
    if (e.key === 'kmla-warehouse/home') {
      navigate(`/${e.key}`);
    } else if (!isLoggedIn) {
      // 로그인 필요 시 확인 팝업 표시
      setRedirectPath(`/${e.key}`);
      setIsModalVisible(true);
    } else {
      // 로그인된 경우 바로 이동
      navigate(`/${e.key}`);
    }
  };

  const handleConfirm = () => {
    // "확인"을 클릭하면 로그인 화면으로 이동
    setIsModalVisible(false);
    if (redirectPath) {
      navigate('/kmla-warehouse/login');
    }
  };

  const handleCancel = () => {
    // "취소"를 클릭하면 아무 작업도 하지 않음
    setIsModalVisible(false);
    setRedirectPath(null);
  };

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={['home']}
        onClick={handleMenuClick}
        items={items1}
        style={{
          height: '100vh',
          paddingTop: '10px',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        }}
      />
      <Modal
        title="로그인이 필요합니다"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="로그인"
        cancelText="취소"
      >
        <p>해당 기능은 로그인이 필요합니다. 로그인 화면으로 이동하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default MenuBar;
