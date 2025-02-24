import axiosPrivate from '../hooks/axiosPrivate';
import Item from '../types/Item';

export const itemService = {
  // Fetch all items, returning only those with "available" status
  getAll: async (): Promise<Item[]> => {
    try {
      const response = await axiosPrivate.get(`/api/item/list`);
      return response.data.filter((item: Item) => item.status === 'available');
    } catch (e) {
      console.error(e.message);
      return [];
    }
  },

  // Fetch item details by ID
  getById: async (id: string): Promise<Item> => {
    try {
      const response = await axiosPrivate.get(`/api/item/${id}`);
      return response.data.item;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // Request to borrow an item by ID and quantity
  borrowRequest: async (id: string, quantity: number): Promise<Item> => {
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

  // Create a new item with form data (including optional image upload)
  create: async (item: FormData): Promise<Item> => {
    try {
      const response = await axiosPrivate.post("/api/item", item, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.newItem;
    } catch (error) {
      throw new Error("Failed to create item");
    }
  },

  // Update an existing item by ID
  update: async (id: string, item: FormData): Promise<Item> => {
    try{
      const response = await axiosPrivate.put(`/api/item/${id}`, item, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      return response.data;
    } catch (error){
      throw new Error("Failed to update item");
    }
  },

 

  // Delete an item
  delete: async (id: string): Promise<void> => {
    try {
      const response = await axiosPrivate.delete(`/api/item/${id}`); 
      return response.data;
    } catch (e) {
      console.error(e.message);
    }
  },

  // Fetch reservation list for a user
  getReservations: async (userInfo) => {
    try {
      const response = await axiosPrivate.get(`/api/team/${userInfo}/borrow-list`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
      throw error;
    }
  },

  // Return an item for a user
  returnItem: async (userInfo) => {
    try {
      const data = await axiosPrivate.post(`/api/borrow-history/${userInfo}/return`);
      return data.data;
    } catch (error) {
      console.error('Error posting item return:', error.message);
      throw error;
    }
  },
};
