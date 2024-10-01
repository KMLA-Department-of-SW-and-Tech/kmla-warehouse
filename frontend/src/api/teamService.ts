import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';

const API_URL = 'http://your-backend-url/api/teams'; // 백엔드 URL을 적절히 변경하세요

export interface Team {
  id: number;
  name: string;
  // 필요한 다른 팀 속성들을 추가하세요
}

export const teamService = {
  getAll: async (): Promise<Team[]> => {
    const response = await axiosPrivate.get(API_URL);
    return response.data;
  },

  search: async (query: string): Promise<Team[]> => {
    const response = await axiosPrivate.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  },

  getTeamInfo: async (id: number): Promise<Team> => {
    const response = await axiosPrivate.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTeam: async (teamData: Omit<Team, 'id'>): Promise<Team> => {
    const response = await axiosPrivate.post(API_URL, teamData);
    return response.data;
  },

  updateTeam: async (id: number, teamData: Partial<Team>): Promise<Team> => {
    const response = await axiosPrivate.put(`${API_URL}/${id}`, teamData);
    return response.data;
  },

  deleteTeam: async (id: number): Promise<void> => {
    await axiosPrivate.delete(`${API_URL}/${id}`);
  },

  getUserInfo : async () => {
    const response = await axiosPrivate.get(`/api/auth`);
    return response.data;
  },
};