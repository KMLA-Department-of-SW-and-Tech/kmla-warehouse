import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';
import { GetItem } from '../types/Item';

const itemService = {
  // Fetch all items, returning only those with "available" status
  getAll: async (): Promise<GetItem[]> => {
    try {
      const response = await axios.get(`/api/item/list`);
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // Fetch item details by ID
  getById: async (id: string): Promise<GetItem> => {
    console.log(id);
    try {
      const response = await axios.get(`/api/item/${id}`);
      console.log(response);
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH // changed
  // Request to borrow an item by ID and quantity
  borrowRequest: async (id: string, quantity: number, accessToken: string): Promise<GetItem> => {
    try {
      // console.log(id, quantity, accessToken);
      const response = await axiosPrivate.patch(`/api/item/${id}/borrow`, { quantity }, accessToken);
      if (!response.data) {
        throw new Error('Failed to borrow item: Invalid response from server');
      }
      return response.data.item;
    } catch (e) {
      console.error('Error in borrowRequest:', e);
      if (e.response) {
        console.error('Error response data:', e.response.data);
        throw(e);
      }
      throw new Error('대여 요청에 실패했습니다. 다시 시도해 주세요.');
    }
  },

  // NEEDS ADMIN AUTH
  // Create a new item with form data (including optional image upload)
  create: async (item: FormData, accessToken: string): Promise<GetItem> => {
    try {
      const response = await axiosPrivate.post("/api/item", item, accessToken, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.newItem;
    } catch (error) {
      throw new Error("Failed to create item");
    }
  },

  // NEEDS ADMIN AUTH
  // Update an existing item by ID
  update: async (id: string, item: FormData, accessToken: string): Promise<GetItem> => {
    try{
      const response = await axiosPrivate.patch(`/api/item/${id}`, item, accessToken, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data;
    } catch (error){
      throw new Error("Failed to update item");
    }
  },

 
  // NEEDS ADMIN AUTH
  // Delete an item
  delete: async (id: string, accessToken: string): Promise<void> => {
    try {
      const response = await axiosPrivate.delete(`/api/item/${id}`, accessToken); 
      return response.data;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH // changed
  // Fetch reservation list for a user
  getReservations: async (accessToken: string) => {
    try {
      console.log("getReservation");
      const response = await axiosPrivate.get(`/api/item/team-list`, accessToken);
      return response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
      throw error;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH
  // Return an item for a user
  returnItem: async (id: string, accessToken: string) => {
    try {
      const data = await axiosPrivate.post(`/api/logs/${id}/return`, {}, accessToken);
      // console.log(data);
      return data.data;
    } catch (error) {
      console.error('Error posting item return:', error.message);
      throw error;
    }
  },
};

export default itemService;
