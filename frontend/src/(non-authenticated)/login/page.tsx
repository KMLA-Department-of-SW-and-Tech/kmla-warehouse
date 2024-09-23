import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { teamService } from '../../api/teamService';
import React from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/', { username, password });
      console.log(response)
      /* 
      // 로그인 성공 시 토큰을 저장합니다 (백엔드 응답에 따라 조정 필요)
      localStorage.setItem('token', response.data.token);
      
      // axios의 기본 헤더에 토큰을 설정합니다
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      // 팀 정보를 가져옵니다 (예: 첫 번째 팀)
      const teams = await teamService.getAll();
      if (teams.length > 0) {
        const teamInfo = await teamService.getTeamInfo(teams[0].id);
        console.log('팀 정보:', teamInfo);
      }

      // 홈 페이지로 이동
      navigate("/equipment-home"); */
    } catch (error) {
      console.error('로그인 실패:', error);
      /* alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); */
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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