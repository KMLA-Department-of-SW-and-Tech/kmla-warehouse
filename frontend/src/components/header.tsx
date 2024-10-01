import React, { useEffect, useState } from 'react';
import './header.css';
import currentUser from '../api/authService'

// Header 컴포넌트 정의
const Headbar: React.FC = () => {
  const [currentUserName, setCurrentUserName] = useState<string>("John Doe");
  useEffect( () => {
    const fetchCurrentUser = async () => {
      const data = await currentUser.currentUser();
      //console.log(data);
      setCurrentUserName(data);
    };
  fetchCurrentUser();
  }, [] )
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          KMLA Warehouse
        </div>
        <div className="user-info">
          <span>{currentUserName}</span> {/* 예시 사용자 이름 */}
        </div>
      </div>
    </header>
  );
};
export default Headbar;