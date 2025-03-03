import axios from "axios";
import axiosPrivate from "../hooks/axiosPrivate";
import { GetUser, PatchUser } from "../types/User";

const userService = {
    getUserInfo: async (accessToken: string): Promise<GetUser> => {
        try {
            const response = await axiosPrivate.get("/api/user", accessToken);
            return response.data;
        } catch (e) {
            console.error("Userservice get user info error: ", e);
            throw e;
        }
    },
    updateCurrentUserInfo: async (
        update: PatchUser,
        accessToken: string
    ): Promise<void> => {
        try {
            const response = await axiosPrivate.patch(
                "/api/user",
                update,
                accessToken
            );
        } catch (e) {
            console.error("Userservice update current user info error: ", e);
            throw e;
        }
    },
    getUnauthorizedUsers: async (accessToken: string): Promise<GetUser[]> => {
        try {
            const response = await axiosPrivate.get(
                "/api/user/unauth-list",
                accessToken
            );
            return response.data;
        } catch (e) {
            console.error("Userservice get unauthorized users error: ", e);
            throw e;
        }
    },
    authorizeUserById: async (
        id: string,
        accessToken: string
    ): Promise<void> => {
        try {
            const response = await axiosPrivate.patch(
                `/api/user/authorize/${id}`,
                {},
                accessToken
            );
        } catch (e) {
            console.error("Userservice authorize user by id error: ", e);
            throw e;
        }
    },
    getAuthorizedUsers: async (accessToken: string): Promise<GetUser[]> => {
        try {
            const response = await axiosPrivate.get(
                "/api/user/auth-list",
                accessToken
            );
            return response.data;
        } catch (e) {
            console.error("Userservice get unauthorized users error: ", e);
            throw e;
        }
    },
    getTeamNameList: async (): Promise<string[]> => {
        try {
            const response = await axios.get("/api/user/team-name-list");
            return response.data;
        } catch (e) {
            console.error("Userservice get team name list error: ", e);
            throw e;
        }
    },
};

export default userService;
