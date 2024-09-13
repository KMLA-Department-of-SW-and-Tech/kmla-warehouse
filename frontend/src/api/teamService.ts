import axios from 'axios';

const API_URL = 'http://your-backend-url/api/teams'; // 백엔드 URL을 적절히 변경하세요

export interface Team {
  id: number;
  name: string;
  // 필요한 다른 팀 속성들을 추가하세요
}

export const teamService = {
  getAll: async (): Promise<Team[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  search: async (query: string): Promise<Team[]> => {
    const response = await axios.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  },

  getTeamInfo: async (id: number): Promise<Team> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTeam: async (teamData: Omit<Team, 'id'>): Promise<Team> => {
    const response = await axios.post(API_URL, teamData);
    return response.data;
  },

  updateTeam: async (id: number, teamData: Partial<Team>): Promise<Team> => {
    const response = await axios.put(`${API_URL}/${id}`, teamData);
    return response.data;
  },

  deleteTeam: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};