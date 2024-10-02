import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './page.css'; // Assuming the same CSS structure as in LoginPage

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) {
      setPasswordError('비밀번호는 4자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await axios.post("/api/team/", {
        username,
        name,
        password,
      });
      console.log(res);
      setSuccessMessage('회원가입이 성공적으로 완료되었습니다.');
      setShowConfirmation(true); // Show the confirmation prompt
    } catch (err) {
      console.error("Error during signup", err);
    }
  };

  // 로그인 페이지로 이동하는 함수
  const handleNavigateToLogin = () => {
    navigate("/kmla-warehouse/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-sidebar">
        <div className="signup-box">
          <h2 className="signup-title">회원가입</h2>
          
          {/* Conditionally render the signup form and button only if showConfirmation is false */}
          {!showConfirmation && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">이름</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">아이디</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
              <button type="submit" className="submit-button">회원가입</button>
            </form>
          )}

          {successMessage && (
            <div className="text-green-500 text-sm mt-4">{successMessage}</div>
          )}

          {/* 로그인 페이지로 이동할 수 있는 텍스트 링크 */}
          {!showConfirmation && (
            <div className="signup-login-link">
              <p>이미 계정이 있으신가요?{' '}
                <a
                  href="#"
                  className="login-link"
                  onClick={handleNavigateToLogin}
                >
                  로그인
                </a>
              </p>
            </div>
          )}

          {/* Show the confirmation box when signup is successful */}
          {showConfirmation && (
            <div className="confirmation-box mt-4">
              <p className="confirmation-text">로그인 페이지로 이동하시겠습니까?</p>
              <div className="confirmation-buttons">
                <button onClick={handleNavigateToLogin} className="submit-button">예</button>
                <button onClick={() => setShowConfirmation(false)} className="cancel-button">아니요</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
