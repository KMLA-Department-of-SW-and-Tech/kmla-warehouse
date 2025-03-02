import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import userService from "../../../js/api/userService";
import './header.css';
import { useAuth } from '../../contexts/authContext';

const Headbar: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>("Guest");
  const navigate = useNavigate(); 
  const authValue = useAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const userInfo = await userService.getUserInfo(authValue.accessToken);
        console.log(userInfo);
        setCurrentUserName(userInfo.userName == undefined ? "Guest" : userInfo.userName);
      } catch (error) {
        setCurrentUserName("Guest"); 
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const handleLogoClick = () => {
    navigate('/admin/item'); // admin main page
  };

  const handleHelloClick = () => {
    navigate('/admin/account-settings');
  }

  return (
    <header className="head">
      <div className="head-container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          KMLA Warehouse
        </div>
        <div className="user-info" onClick={handleHelloClick} style={{cursor: 'pointer'}}>
          {loading ? <span></span> : authValue.userLoggedIn ? (
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
