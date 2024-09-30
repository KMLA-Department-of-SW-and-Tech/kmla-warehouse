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
      console.log(axiosPrivate);
      console.log("Successful login");
      try { // example of axiosPrivate usage
        const response = await axiosPrivate.get("/api/auth/");
        console.log(response);
        // navigate("/kmla-warehouse/home"); //살려라!!!
      } catch (err) {
        console.log(err);
      }
      //await authService.logout(); //example of logout
    } catch(err) {
      setError(err.response.data);
    }
  }
  return (
    <div className="login-container">
      <div className="login-sidebar">
        <div className="login-box">
          <h2 className="login-title">로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                아이디
              </label>
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
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              로그인
            </button>

          </form>
          <button onClick={
        async () => {
          await authService.logout();
        }
      }>Logout</button>
      <button onClick={
        async () => {
          await axiosPrivate.post('/api/item/66f81dfc1c40becece185d1b/borrow', {
            quantity: 1,
          });
        }
      }>Click Me</button>
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-bold">
              아이디
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-bold">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {error ? <div>{error}</div> : <></>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 


