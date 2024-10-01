import axiosPrivate from '../hooks/axiosPrivate';

export interface BorrowHistory {
  _id: string;
  item: string;
  quantity: number;
  type: "borrow" | "return";
  user: string;
  timestamp: string;
}

export const borrowHistoryService = {

  //GET 히스토리 리스트
  getAll: async (): Promise<BorrowHistory[]> => {
    try {
      const response = await axiosPrivate.get(`/api/borrow-history/list`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },
  /*
  search: async (query: string): Promise<BorrowHistory[]> => {
    const response = await axiosPrivate.get(`api/borrow-history/search`, { params: { query } });
    return response.data;
  },
  */

  //GET 팀별 히스토리 정보
  getBorrowHistoryInfo: async (id: string): Promise<BorrowHistory> => {
    const response = await axiosPrivate.get(`$/api/borrow-history/${id}`);
    return response.data;
  },

  //POST 히스토리 업로드하기
  createBorrowHistory: async (borrowHistoryData: BorrowHistory): Promise<BorrowHistory> => {
    const response = await axiosPrivate.post("/api/borrow-history/", borrowHistoryData);
    return response.data;
  },

  //PUT 히스토리 업데이트하기
  updateBorrowHistory: async (id: string, borrowHistoryData: Partial<BorrowHistory>): Promise<BorrowHistory> => {
    const response = await axiosPrivate.put(`/api/borrow-history/${id}`, borrowHistoryData);
    return response.data;
  },

  //DELETE 히스토리 삭제하기
  deleteBorrowHistory: async (id: string): Promise<void> => {
    await axiosPrivate.delete(`/api/borrow-history/${id}`);
  },

};