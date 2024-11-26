import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import './header.css';
import currentUser from '../api/authService';

// Header 컴포넌트 정의
const Headbar: React.FC = () => {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await currentUser.currentUser();
        setCurrentUserName(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setCurrentUserName(null); // 에러 발생 시 로그인 상태를 비로그인으로 처리
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogoClick = () => {
    navigate('/kmla-warehouse/home'); // 로고 클릭 시 홈 화면으로 이동
  };

  return (
    <header className="head">
      <div className="head-container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          KMLA Warehouse
        </div>
        <div className="user-info">
          {currentUserName ? (
            <span>{currentUserName}님, KMLA WAREHOUSE에 오신 것을 환영합니다</span>
          ) : (
            <span>로그인을 하신 후 다른 기능을 사용하실 수 있습니다</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Headbar;
