import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import './header.css';
import { useAuth } from '../../contexts/authContext';
// import authService from '../../api/authService';

const Headbar: React.FC = () => {
  // const [loading, setLoading] = useState<Boolean>(true);
  // const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const authValue = useAuth();

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const data = await authService.currentUser();
  //       setCurrentUserName(data);
  //     } catch (error) {
  //       setCurrentUserName(null); // 에러 발생 시 로그인 상태를 비로그인으로 처리
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  const handleLogoClick = () => {
    navigate('/equipment'); // admin main page
  };

  const handleHelloClick = () => {
    navigate('/account-settings');
  }

  return (
    <header className="head">
      <div className="head-container">
        <div className="main-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          KMLA Warehouse
        </div>
        <div className="head-user-info" onClick={handleHelloClick} style={{cursor: 'pointer'}}>
          {/* <span>{currentUserName}님, KMLA WAREHOUSE에 오신 것을 환영합니다</span> */}
          {authValue.userLoggedIn ? (
            <span>로그인 됨</span>
          ) : (
            <span>로그인을 하신 후 다른 기능을 사용하실 수 있습니다</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Headbar;
