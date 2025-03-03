import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';
import userService from '../../../js/api/userService';

import './header.css';

const UserHeader: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<Boolean>(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  const authValue = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const userInfo = await userService.getUserInfo(authValue.accessToken);
        // console.log(userInfo);
        setCurrentUserName(userInfo.userName == undefined ? "(승인되지 않음)" : userInfo.userName);
        setIsVerified(userInfo.userType != "Unauthorized");
      } catch (error) {
        setCurrentUserName("(승인되지 않음))");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogoClick = () => {
    navigate('/home'); // 로고 클릭 시 홈 화면으로 이동
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
        <div className="user-info" onClick={handleHelloClick} style={{cursor: 'pointer'}}>
          {loading ? <span></span> : authValue.userLoggedIn ? (
            <span><div>{currentUserName}님, KMLA WAREHOUSE에 오신 것을 환영합니다</div><div className="unverifiedLabel">{isVerified ? "" : "관리자에게 계정을 인증받은 후 모든 기능을 사용할 수 있습니다."}</div></span>
          ) : (
            <span>로그인을 하신 후 다른 기능을 사용하실 수 있습니다</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
