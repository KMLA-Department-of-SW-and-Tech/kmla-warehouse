import axiosPrivate from "../hooks/axiosPrivate";
import { GetLog, PatchLog } from "../types/Log";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const logService = {
    // NEEDS ADMIN AUTH
    // GET log list
    getAll: async (accessToken: string): Promise<GetLog[]> => {
        try {
            const response = await axiosPrivate.get(
                `${API_BASE_URL}/api/logs/list`,
                accessToken
            );
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
        accessToken: string
    ): Promise<GetLog> => {
        try {
            const response = await axiosPrivate.patch(
                `${API_BASE_URL}/api/logs/${id}`,
                update,
                accessToken
            );
            return response.data;
        } catch (e) {
            console.error("Logservice update log error: ", e);
            throw e;
        }
    },
};

export default logService;
