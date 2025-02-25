import axios from 'axios';

import {GetLog, PatchLog} from "../types/Log";

export const logService = {

  // NEEDS ADMIN AUTH
  // GET 로그 리스트
  getAll: async (): Promise<GetLog[]> => {
    try {
      const response = await axios.get(`/api/logs/list`);
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // //GET 팀별 로그 정보
  // getLogInfo: async (teamName: string): Promise<GetLog> => {
  //   try {
  //     const response = await axios.get(`/api/logs/list/${teamName}`);
  //     return response.data;
  //   } catch (e) {
  //     console.error(e.message);
  //     throw e;
  //   }
  // },

  //POST 로그 업로드하기
  // create: async (borrowHistoryData: GetLog): Promise<Reservation> => {
  //   const response = await axios.post("/api/logs/", borrowHistoryData);
  //   return response.data;
  // },

  // NEEDS ADMIN AUTH
  //PATCH 로그 업데이트하기
  update: async (id: string, update: PatchLog): Promise<GetLog> => {
    const response = await axios.patch(`/api/logs/${id}`, update);
    return response.data;
  },

  //DELETE 로그 삭제하기
  // delete: async (id: string): Promise<void> => {
  //   try{
  //     const response = await axios.delete(`/api/logs/${id}`);
  //     return response.data;
  //   }catch(e){
  //     console.error(e);
  //     throw(e);
  //   }
  //   ;
    
  // },

};