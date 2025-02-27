import axios from 'axios';

// use try catch

const axiosPrivate: {
    get: (apiUrl: string, accessToken: string, axiosConfig?: object) => Promise<any>,
    post: (apiUrl: string, requestData: any, accessToken: string, axiosConfig?: object) => Promise<any>,
    put: (apiUrl: string, requestData: any, accessToken: string, axiosConfig?: object) => Promise<any>,
    patch: (apiUrl: string, requestData: any, accessToken: string, axiosConfig?: object) => Promise<any>,
    delete: (apiUrl: string, accessToken: string, axiosConfig?: object) => Promise<any>
} = {
    get: async (apiUrl, accessToken, axiosConfig) => {
        const response = await axios.get(apiUrl, {
            ...axiosConfig,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    },
    post: async (apiUrl, requestData, accessToken, axiosConfig) => {
        const response = await axios.post(apiUrl, requestData, {
            ...axiosConfig,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    },
    put: async (apiUrl, requestData, accessToken, axiosConfig) => {
        const response = await axios.put(apiUrl, requestData, {
            ...axiosConfig,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    },
    patch: async (apiUrl, requestData, accessToken, axiosConfig) => {
        const response = await axios.patch(apiUrl, requestData, {
            ...axiosConfig,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    },
    delete: async (apiUrl, accessToken, axiosConfig) => {
        const response = await axios.delete(apiUrl, {
            ...axiosConfig,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response;
    },
};

export default axiosPrivate;