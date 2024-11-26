import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import React from "react";
import axiosPrivate from "../../hooks/axiosPrivate"; 
import authService from "../../api/authService"; 
import './login.css';

const LoginPage = () => {

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      // 로그인 API 호출
      await authService.login(username, password);

      // 로그인 성공 시 역할에 따라 페이지를 이동
      axiosPrivate.roles.includes("Admin")
        ? navigate("/kmla-warehouse/admin/equipment") // 관리자 페이지로 이동
        : navigate("/kmla-warehouse/home"); // 일반 사용자 홈 페이지로 이동
    } catch (err) {
      // 기본 에러 메시지 설정
      let errorMessage = "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.";
      if (err.response && err.response.data) {
        // 서버로부터 전달받은 에러 메시지를 분석하여 사용자에게 적합한 메시지 표시
        const serverMessage = err.response.data || "";
        if (serverMessage.includes("password")) {
          errorMessage = "비밀번호가 일치하지 않습니다.";
        } else if (serverMessage.includes("username")) {
          errorMessage = "아이디가 일치하지 않습니다.";
        }
      }
      setError(errorMessage); // 에러 메시지 상태 업데이트
    }
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignUp = () => {
    navigate("/kmla-warehouse/signup");
  };

  return (
    <div className="login-container">
      {/* 로그인 페이지 레이아웃 */}
      <div className="login-sidebar">
        <div className="login-box">
          <h2 className="login-title">로그인</h2> {/* 페이지 제목 */}

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">id</label> {/* 사용자 ID 라벨 */}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // 입력값 변경 처리
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">비밀번호</label> {/* 비밀번호 라벨 */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // 입력값 변경 처리
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              로그인 {/* 로그인 버튼 */}
            </button>
            {error && <div className="error-message">{error}</div>} {/* 에러 메시지 출력 */}
          </form>

          {/* 회원가입 페이지로 이동 링크 */}
          <div className="signup-redirect">
            <p>
              계정이 없으신가요?{" "}
              <a href="#" className="signup-link" onClick={handleSignUp}>
                회원가입 {/* 회원가입 링크 */}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* 페이지 하단에 표시할 추가 텍스트 */}
      <div className="login-footer">
        2024 과학기술부 제작, 사진 제공 28기 진수민
      </div>
    </div>
  );
};

export default LoginPage;
