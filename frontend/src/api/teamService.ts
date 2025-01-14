import axiosPrivate from '../hooks/axiosPrivate';

export interface Team {
  _id: string;
  name: string;
  status: string;
}

export interface AddTeam{
  username: string;
  password: string;
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
    console.log(response.data.newTeam)
    return response.data.newTeam;
  },

  //POST 팀정보 업로드하기
  create: async (teamData: AddTeam): Promise<AddTeam> => {
    const response = await axiosPrivate.post("/api/team/", teamData);
    return response.data.newTeam;
  },

  //PUT 팀정보 업데이트하기
  update: async (id: string, teamData: Partial<Team>): Promise<Team> => {
    const response = await axiosPrivate.put(`/api/team/${id}`, teamData);
    return response.data;
  },

  //DELETE 팀 삭제하기
  delete: async (id: string): Promise<void> => {
    await axiosPrivate.delete(`/api/team/${id}`);
  },

  //유저 정보 가져오기
  getUserInfo : async () => {
    const response = await axiosPrivate.get(`/api/auth`);
    return response.data;
  },
};