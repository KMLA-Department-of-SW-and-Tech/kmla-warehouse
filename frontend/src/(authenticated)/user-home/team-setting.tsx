import React, { useEffect, useState } from 'react';
import { teamService, Team } from '../../api/teamService';
import { PageLayout } from '../../layouts/page-layout'; 
import { useParams } from 'react-router-dom';
import { Typography, Spin, Layout, Button } from 'antd';

const TeamSettingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [teamName, setTeamName] = useState('');
  const [nickname, setNickname] = useState(''); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      setIsLoading(true);
      try {
        const teamData = await teamService.getTeamInfo(Number(id));
        setTeam(teamData);
        setTeamName(teamData.name);
      } catch (error) {
        setError('팀 정보를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTeamInfo();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await teamService.update(Number(id), { name: teamName });
      alert('팀 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      setError('팀 정보를 수정하는 중 문제가 발생했습니다.');
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <PageLayout layout="narrow" isCentered={true}>
      <div className="bg-white rounded-xl shadow-lg p-10 w-full">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-8">팀 설정</h2>
        {team ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  id="team-name"
                  name="team-name"
                  type="text"
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-black placeholder-gray-500 text-gray-900 sm:text-lg"
                  placeholder="팀 이름"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
       
            </div>

            <div>
              <Button
                className="w-full py-3 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none"
              >
                팀 정보 수정
              </Button>
            </div>
          </form>
        ) : (
          <div>팀 정보를 불러올 수 없습니다.</div>
        )}
      </div>
    </PageLayout>
  );
};

export default TeamSettingPage;
