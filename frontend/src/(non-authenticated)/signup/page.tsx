import React, { useState } from 'react';
import { PageLayout } from '../../layouts/page-layout'; // Assume this is the correct path
import axios from 'axios';

const SignUpPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    const res = await axios.post("/api/team/", {
        username: nickname,
        name: teamName,
        password: password,
    });
    console.log(res);
  };

  return (
    <PageLayout layout="narrow" isCentered={true}>
      <div className="bg-white rounded-xl shadow-lg p-10 w-full">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">KMLA WAREHOUSE</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
          <div>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-500 text-gray-900 sm:text-lg"
                placeholder="융프명"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <input
                id="team-name"
                name="team-name"
                type="text"
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-500 text-gray-900 sm:text-lg"
                placeholder="아이디"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-500 text-gray-900 sm:text-lg"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-500 text-gray-900 sm:text-lg"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {passwordError && (
            <div className="text-red-500 text-sm">{passwordError}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default SignUpPage;
