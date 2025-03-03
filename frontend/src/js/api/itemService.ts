import axios from "axios";
import axiosPrivate from "../hooks/axiosPrivate";
import { GetItem } from "../types/Item";

const itemService = {
  // Fetch all items, returning only those with "available" status
  getAll: async (): Promise<GetItem[]> => {
    try {
      const response = await axios.get(`/api/item/list`);
      return response.data;
    } catch (e) {
      console.error("Itemservice get all items error: ", e);
      throw e;
    }
  },

  // Fetch item details by ID
  getById: async (id: string): Promise<GetItem> => {
    try {
      const response = await axios.get(`/api/item/${id}`);
      return response.data;
    } catch (e) {
      console.error("Itemservice get item by id error: ", e);
      throw e;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH // changed
  // Request to borrow an item by ID and quantity
  borrowRequest: async (
    id: string,
    quantity: number,
    accessToken: string
  ): Promise<GetItem> => {
    try {
      const response = await axiosPrivate.patch(
        `/api/item/${id}/borrow`,
        { quantity },
        accessToken
      );
      if (!response.data) {
        throw new Error("Failed to borrow item: Invalid response from server");
      }
      return response.data.item;
    } catch (e) {
      console.error("Itemservice borrow request error:", e);
      throw e;
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
      console.error("Itemservice create item error: ", error);
      throw error;
    }
  },

  // NEEDS ADMIN AUTH
  // Update an existing item by ID
  update: async (
    id: string,
    item: FormData,
    accessToken: string
  ): Promise<GetItem> => {
    try {
      const response = await axiosPrivate.patch(
        `/api/item/${id}`,
        item,
        accessToken,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Itemservice update item error: ", error);
      throw error;
    }
  },

  // NEEDS ADMIN AUTH
  // Delete an item
  delete: async (id: string, accessToken: string): Promise<void> => {
    try {
      const response = await axiosPrivate.delete(
        `/api/item/${id}`,
        accessToken
      );
      return response.data;
    } catch (e) {
      console.error("Itemservice delete item error: ", e);
      throw e;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH // changed
  // Fetch reservation list for a user
  getReservations: async (accessToken: string) => {
    try {
      const response = await axiosPrivate.get(
        `/api/item/team-list`,
        accessToken
      );
      return response.data;
    } catch (error) {
      console.error("Itemservice get reservation errror: ", error);
      throw error;
    }
  },

  // AUTH RELATED + NEEDS USER AUTH
  // Return an item for a user
  returnItem: async (id: string, accessToken: string) => {
    try {
      const data = await axiosPrivate.post(
        `/api/logs/${id}/return`,
        {},
        accessToken
      );
      return data.data;
    } catch (error) {
      console.error("Itemservice return item error: ", error);
      throw error;
    }
  },
};

export default itemService;
