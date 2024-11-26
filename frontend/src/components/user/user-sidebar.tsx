import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuProps, Badge, Modal } from 'antd';
import { AppstoreOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import currentUser from '../../api/authService';
import './user-sidebar.css'; // CSS 파일을 가져옵니다.

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [redirectPath, setRedirectPath] = useState<string | null>(null); // 이동 경로 저장

  useEffect(() => {
    // 현재 로그인된 사용자 정보 확인
    const checkLoginStatus = async () => {
      try {
        const user = await currentUser.currentUser();
        setIsLoggedIn(!!user); // user가 존재하면 로그인 상태로 설정
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoggedIn(false); // 에러 발생 시 로그아웃 상태로 설정
      }
    };

    checkLoginStatus();
  }, []);

  const items1: MenuProps['items'] = [
    {
      key: 'categories',
      label: '카테고리',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/home',
          icon: <AppstoreOutlined />,
          label: '전체 목록보기',
        },
      ],
    },
    {
      key: 'mypage',
      label: '마이페이지',
      type: 'group',
      children: [
        {
          key: 'kmla-warehouse/reservation',
          icon: (
            <Badge size="small">
              <HistoryOutlined />
            </Badge>
          ),
          label: '반납하기',
        },
        {
          key: 'kmla-warehouse/account-settings',
          icon: <UserOutlined />,
          label: '계정 및 로그아웃',
        },
      ],
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'kmla-warehouse/home') {
      // 홈 페이지는 로그인 없이도 접근 가능
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
        className="menu-bar" // CSS 클래스 추가
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
