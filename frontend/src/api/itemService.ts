import axios from 'axios';

export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  location: string;
}

export const itemService = {
  // 전체 리스트 가져오기
  getAll: async (): Promise<Item[]> => {
    try {
      const response = await axios.get(`/api/item/list`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },

  // 물품 정보 가져오기
  getById: async (id: string): Promise<Item> => {
    try {
      const response = await axios.get(`/api/item/${id}`);
      return response.data.item;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // 물품 생성
  create: (item: Omit<Item, 'id'>): Promise<Item> => {
    return axios.post(`/api/item`, item)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  },

  // 물품 업데이트 (PUT)
  update: (id: string, item: Item): Promise<Item> => {
    return axios.put(`/api/item/${id}`, item)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  },

  // 물품 부분 업데이트 (PATCH)
  partialUpdate: async (id: string, partialItem: Partial<Item>): Promise<Item> => {
    try {
      const response = await axios.patch(`/api/item/${id}`, partialItem);
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // 물품 삭제
  delete: (id: string): Promise<void> => {
    return axios.delete(`/api/item/${id}`)
      .then(() => {
        console.log(`Item with id ${id} deleted successfully.`);
      })
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  },
};
