import axios from 'axios';

const BASE_URL = 'http://your-backend-url.com/api'; // 백엔드 URL을 여기에 입력하세요

export interface Item {
  id: string;
  name: string;
  // 다른 필요한 필드들을 추가하세요
}

export const itemService = {
  // 전체 리스트 가져오기
  getAll: async (): Promise<Item[]> => {
    const response = await axios.get(`${BASE_URL}/item/list`);
    return response.data;
  },

  // 물품 정보 가져오기
  getById: async (id: string): Promise<Item> => {
    const response = await axios.get(`${BASE_URL}/item/${id}`);
    return response.data;
  },

  // 물품 생성
  create: async (item: Omit<Item, 'id'>): Promise<Item> => {
    const response = await axios.post(`${BASE_URL}/item`, item);
    return response.data;
  },

  // 물품 업데이트 (PUT)
  update: async (id: string, item: Item): Promise<Item> => {
    const response = await axios.put(`${BASE_URL}/item/${id}`, item);
    return response.data;
  },

  // 물품 부분 업데이트 (PATCH)
  partialUpdate: async (id: string, partialItem: Partial<Item>): Promise<Item> => {
    const response = await axios.patch(`${BASE_URL}/item/${id}`, partialItem);
    return response.data;
  },

  // 물품 삭제
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/items/${id}`);
  },
};