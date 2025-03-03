import axiosPrivate from "../hooks/axiosPrivate";
import { GetLog, PatchLog } from "../types/Log";

const logService = {
  // NEEDS ADMIN AUTH
  // GET log list
  getAll: async (accessToken: string): Promise<GetLog[]> => {
    try {
      const response = await axiosPrivate.get(`/api/logs/list`, accessToken);
      return response.data;
    } catch (e) {
      console.error("Logservice get all logs error: ", e);
      throw e;
    }
  },
  // NEEDS ADMIN AUTH
  //PATCH update log
  update: async (
    id: string,
    update: PatchLog,
    accessToken: string,
  ): Promise<GetLog> => {
    try {
      const response = await axiosPrivate.patch(
        `/api/logs/${id}`,
        update,
        accessToken,
      );
      return response.data;
    } catch (e) {
      console.error("Logservice update log error: ", e);
      throw e;
    }
  },
};

export default logService;
