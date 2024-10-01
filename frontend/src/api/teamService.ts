import axiosPrivate from '../hooks/axiosPrivate';

export interface Team {
  id: string;
  name: string;
}

export const teamService = {

  //GET 팀리스트
  getAll: async (): Promise<Team[]> => {
    try {
      const response = await axiosPrivate.get(`/api/team/list`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },
  /*
  search: async (query: string): Promise<Team[]> => {
    const response = await axiosPrivate.get(`${API_URL}/search`, { params: { query } });
    return response.data;
  },
  */

  //GET 아이디별 팀정보
  getTeamInfo: async (id: string): Promise<Team> => {
    const response = await axiosPrivate.get(`/api/team/${id}`);
    return response.data;
  },

  //POST 팀정보 업로드하기
  createTeam: async (teamData: Team): Promise<Team> => {
    const response = await axiosPrivate.post("/api/team/", teamData);
    return response.data;
  },

  //PUT 팀정보 업데이트하기
  updateTeam: async (id: string, teamData: Partial<Team>): Promise<Team> => {
    const response = await axiosPrivate.put(`/api/team/${id}`, teamData);
    return response.data;
  },

  //DELETE 팀 삭제하기
  deleteTeam: async (id: string): Promise<void> => {
    await axiosPrivate.delete(`/api/team/${id}`);
  },

  //유저 정보 가져오기
  getUserInfo : async () => {
    const response = await axiosPrivate.get(`/api/auth`);
    return response.data;
  },
};