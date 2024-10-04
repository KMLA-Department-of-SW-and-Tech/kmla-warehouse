import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axiosPrivate from "../../hooks/axiosPrivate";
import authService from "../../api/authService";
import './page.css';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      axiosPrivate.roles.includes("Admin")
        ? navigate("/kmla-warehouse/admin/equipment")
        : navigate("/kmla-warehouse/home");
    } catch (err) {
      let errorMessage = "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.";
      
      if (err.response && err.response.data) {
        // 백엔드의 에러 메시지를 분석하여 사용자에게 적합한 메시지를 설정
        const serverMessage = err.response.data.message || "";
        if (serverMessage.includes("password")) {
          errorMessage = "비밀번호가 일치하지 않습니다.";
        } else if (serverMessage.includes("username")) {
          errorMessage = "아이디가 일치하지 않습니다.";
        }
      }
      setError(errorMessage);
    }
  };
  
  

  // Navigate to sign up page
  const handleSignUp = () => {
    navigate("/kmla-warehouse/signup");
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="login-box">
          <h2 className="login-title">로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">id</label>
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
            <button type="submit" className="submit-button">
              로그인
            </button>
            {/* Show error message if any */}
            {error && <div className="error-message">{error}</div>}

          </form>

          {/* Sign-up link */}
          <div className="signup-redirect">
            <p>
              계정이 없으신가요?{' '}
              <a
                href="#"
                className="signup-link"
                onClick={handleSignUp}
              >
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
