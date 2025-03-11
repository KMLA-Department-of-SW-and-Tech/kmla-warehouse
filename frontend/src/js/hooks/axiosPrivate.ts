import axios from "axios";

const axiosPrivate: {
    // allows authorized api access
    get: (
        apiUrl: string,
        accessToken: string,
        axiosConfig?: { headers?: object }
    ) => Promise<any>;
    post: (
        apiUrl: string,
        requestData: any,
        accessToken: string,
        axiosConfig?: { headers?: object }
    ) => Promise<any>;
    put: (
        apiUrl: string,
        requestData: any,
        accessToken: string,
        axiosConfig?: { headers?: object }
    ) => Promise<any>;
    patch: (
        apiUrl: string,
        requestData: any,
        accessToken: string,
        axiosConfig?: { headers?: object }
    ) => Promise<any>;
    delete: (
        apiUrl: string,
        accessToken: string,
        axiosConfig?: { headers?: object }
    ) => Promise<any>;
} = {
    get: async (apiUrl, accessToken, axiosConfig) => {
        try {
            const response = await axios.get(apiUrl, {
                ...axiosConfig,
                withCredentials: true,
                headers: Object.assign({
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }, axiosConfig?.headers),
            });
            return response;
        } catch (err) {
            console.error("Axiosprivate get error: ", err);
            throw err;
        }
    },
    post: async (apiUrl, requestData, accessToken, axiosConfig) => {
        try {
            const response = await axios.post(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
                headers: Object.assign({
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }, axiosConfig?.headers),
            });
            return response;
        } catch (err) {
            console.error("Axiosprivate post error: ", err);
            throw err;
        }
    },
    put: async (apiUrl, requestData, accessToken, axiosConfig) => {
        try {
            const response = await axios.put(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
                headers: Object.assign({
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }, axiosConfig?.headers),
            });
            return response;
        } catch (err) {
            console.error("Axiosprivate put error: ", err);
            throw err;
        }
    },
    patch: async (apiUrl, requestData, accessToken, axiosConfig) => {
        try {
            const response = await axios.patch(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
                headers: Object.assign({
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }, axiosConfig?.headers),
            });
            return response;
        } catch (err) {
            console.error("Axiosprivate patch error: ", err);
            throw err;
        }
    },
    delete: async (apiUrl, accessToken, axiosConfig) => {
        try {
            const response = await axios.delete(apiUrl, {
                ...axiosConfig,
                withCredentials: true,
                headers: Object.assign({
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }, axiosConfig?.headers),
            });
            return response;
        } catch (err) {
            console.error("Axiosprivate delete error: ", err);
            throw err;
        }
    },
};

export default axiosPrivate;
