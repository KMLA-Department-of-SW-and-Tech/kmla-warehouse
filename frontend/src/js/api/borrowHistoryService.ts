import axios from 'axios';

import Reservation from "../../types/Reservation";

export const borrowHistoryService = {

  //GET 히스토리 리스트
  getAll: async (): Promise<Reservation[]> => {
    try {
      const response = await axios.get(`/api/borrow-history/list`);
      const responseData = response.data;
      console.log(responseData)
      const result = responseData.map(data => {
        data.item = data.item.name;
        data.user = data.user.name;
        return data;
      })
      return response.data;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },
  /*
  search: async (query: string): Promise<Reservation[]> => {
    const response = await axiosPrivate.get(`api/borrow-history/search`, { params: { query } });
    return response.data;
  },
  */

  //GET 팀별 히스토리 정보
  getBorrowHistoryInfo: async (id: string): Promise<Reservation> => {
    const response = await axios.get(`/api/borrow-history/${id}`);
    return response.data;
  },

  //POST 히스토리 업로드하기
  create: async (borrowHistoryData: Reservation): Promise<Reservation> => {
    const response = await axios.post("/api/logs/", borrowHistoryData);
    return response.data;
  },

  //PATCH 히스토리 업데이트하기
  update: async (id: string, borrowHistoryData: Partial<Reservation>): Promise<Reservation> => {
    const response = await axios.patch(`/api/logs/${id}`, borrowHistoryData);
    return response.data;
  },

  //DELETE 히스토리 삭제하기
  delete: async (id: string): Promise<void> => {
    try{
      const response = await axios.delete(`/api/logs/${id}`);
      return response.data;
    }catch(e){
      console.error(e);
      throw(e);
    }
    ;
    
  },

};