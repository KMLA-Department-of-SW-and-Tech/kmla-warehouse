import { useState } from "react"; 
import { Navigate, useNavigate } from "react-router-dom"; 
import React from "react";
// import axiosPrivate from "../../../hooks/axiosPrivate"; 
// import authService from "../../../api/authService"; 
import './login.css';
import { useAuth } from "../../../contexts/authContext";
import { /*changeUserPwd, signUserIn,*/ signUserInWithGoogle } from "../../../../js/firebase/auth";
import { getAdditionalUserInfo } from "firebase/auth";

const LoginPage = () => {
  const { userLoggedIn } = useAuth();

  const [userEmail, setUserEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      const res = await signUserInWithGoogle();
      const isNewUser = getAdditionalUserInfo(res)?.isNewUser;
      console.log(isNewUser);

    } catch (err) {
      setError("로그인에 실패했습니다.");
    }
  }
 
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); 
  //   if(isSigningIn) return;
  //   setIsSigningIn(true);
  //   try {
  //     const email = e.target[0].value;
  //     const pwd = e.target[1].value;
  //     const res = await signUserIn(email, pwd);
  //     console.log(res);
  //   } catch (err) {

  //      // firebases authentication error 목록을 살펴보면서 고쳐야 함


  //     // previous code
  //     let errorMessage = "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.";
  //     // if (err.response && err.response.data) {
  //     //   // 서버로부터 전달받은 에러 메시지를 분석하여 사용자에게 적합한 메시지 표시
  //     //   const serverMessage = err.response.data || "";
  //     //   if (serverMessage.includes("password")) {
  //     //     errorMessage = "비밀번호가 일치하지 않습니다.";
  //     //   } else if (serverMessage.includes("userEmail")) {
  //     //     errorMessage = "아이디가 일치하지 않습니다.";
  //     //   }
  //     // }
  //     setError(errorMessage); // 에러 메시지 상태 업데이트
  //   } finally {
  //     setIsSigningIn(false);
  //   }
  // };

  // 회원가입 페이지로 이동하는 함수
  
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      <div className="login-container">
        <div className="login-sidebar">
          <div className="login-box">
            <h2 className="login-title">로그인</h2>

            {/* <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="user-email" className="form-label">이메일</label>
                <input
                  type="text"
                  id="user-email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
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
              <button type="submit" className="submit-button" disabled={isSigningIn}>
              {isSigningIn ? '로그인하는 중...' : '로그인'}
              </button>
            </form> */}
            {/* <div className="signup-redirect">
              <p>
                계정이 없으신가요?{" "}
                <a href="#" className="signup-link" onClick={handleSignUp}>
                  회원가입
                </a>
              </p>
            </div> */}
            


            {/* faulty css from here */}
            {/* ------------OR------------ 느낌이면 좋을 듯 */}
            {/* <div style={{width: "100%", textAlign: "center"}}> 
              OR
            </div> */}
            <p>
              Signing in enables features such as booking equipment (highly recommended). If this is your first time signing in, you will have to edit your user profile to request an access grant from the admin.
            </p>
            <button onClick={handleGoogleLogin} style={{backgroundColor: "white", border: "1px solid black", width: "100%",height: "40px", padding: "5px", display: "flex", flexDirection: "row", alignContent: "center", gap: "10px", justifyContent: "center"}} >
              <svg style={{height: "30px"}} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_40)">
                      <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                      <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                      <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                      <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                  </g>
                  <defs>
                      <clipPath id="clip0_17_40">
                          <rect width="48" height="48" fill="white" />
                      </clipPath>
                  </defs>
              </svg>
              <div>구글로 계속하기</div>
            </button>
            
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>

        <div className="login-footer">
          2024 과학기술부 제작, 사진 제공 28기 진수민
        </div>
      </div>
    </>
  );
};

export default LoginPage;
