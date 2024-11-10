
import axiosPrivate from '../hooks/axiosPrivate';

export interface Item {
  _id: string;
  name: string;
  description: string;
  totalQuantity: number;
  availableQuantity: number;
  location: string;
  imageUrl?: string;
  tags: string[];  
  status: "available" | "deleted";  
  category: string;  
}


export const itemService = {
  getAll: async (): Promise<Item[]> => {
    try {
      const response = await axiosPrivate.get(`/api/item/list`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },
  getById: async (id: string): Promise<Item> => {
    try {
      const response = await axiosPrivate.get(`/api/item/${id}`);
      console.log("b")
      return response.data.item;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },
borrowRequest: async (id: string, quantity: number ): Promise<Item> => {
  try {
    const response = await axiosPrivate.post(`/api/item/${id}/borrow`, { quantity });
    if (!response.data) {
      throw new Error('Failed to borrow item: Invalid response from server');
    }
    return response.data.item;
  } catch (e) {
    console.error('Error in borrowRequest:', e); 
    if (e.response) {
      console.error('Error response data:', e.response.data); 
    }
    throw new Error('대여 요청에 실패했습니다. 다시 시도해 주세요.');
  }
},
  
  create: (item: Item): Promise<Item> => {
    return axiosPrivate.post(`/api/item`, item)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  },
  update: (id: string, item: Item): Promise<Item> => {
    return axiosPrivate.put(`/api/item/${id}`, item)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  },
  partialUpdate: async (id: string, partialItem: Partial<Item>): Promise<Item> => {
    try {
      const response = await axiosPrivate.patch(`/api/item/${id}`, partialItem);
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },
  delete: async (id: string): Promise<void> => {
    try{
      console.log('a');
      const response = await axiosPrivate.get(`/api/item/${id}`);
      console.log('b');
      return response.data;
    } catch(e){
      console.error(e.message);
    }
  },

  // 예약 데이터 가져오기
  getReservations: async (userInfo) => {
    try {
      const response = await axiosPrivate.get(`/api/team/${userInfo}/borrow-list`); // 예약 데이터를 가져오는 API
      console.log(response.data)
      return response.data; // 예약 데이터 반환
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
      throw error;
    }
  },

  // 물품 반납
  returnItem: async(userInfo) => {
    try {
      const data = await axiosPrivate.post(`/api/borrow-history/${userInfo}/return`);
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error('Error posting item return:', error.message);
      throw error;
    }
  },
};
