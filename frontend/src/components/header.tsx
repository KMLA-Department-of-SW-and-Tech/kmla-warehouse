import React from 'react';
import './header.css'; // 스타일 파일을 가져옵니다.

// Header 컴포넌트 정의
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          KMLA Warehouse
        </div>
        <div className="user-info">
          <span>John Doe</span> {/* 예시 사용자 이름 */}
        </div>
      </div>
    </header>
  );
};

export default Header;
