import axios from 'axios';
import authService from '../api/authService';

// use try catch

const axiosPrivate = {
    accessToken: "",
    refreshRequest: async () => { // internal function do not use outside
        const result = await axios.get("/api/refresh");
        axiosPrivate.accessToken = result.data.accessToken;
    },
    get: async (apiUrl, axiosConfig) => {
        try {
            const response = await axios.get(apiUrl, {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            return response;
        } catch (err) {
            if(err.response.data == "Invalid access token") {
                try {
                    await axiosPrivate.refreshRequest();
                    // successsful refresh
                    const response = await axios.get(apiUrl, {
                        ...axiosConfig,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } catch(err) {
                    console.log("Unsuccessful refresh");
                    /* await authService.logout(); */
                    throw err;
                }
            }
            else throw err;
        }
    },
    post: async (apiUrl, requestData, axiosConfig) => {
        try {
            const response = await axios.post(apiUrl, requestData, {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            return response;
        } catch (err) {
            if(err.response.data == "Invalid access token") {
                const refreshResult = await axiosPrivate.refreshRequest();
                if(refreshResult[0]) {
                    // successsful refresh
                    const response = await axios.post(apiUrl, requestData, {
                        ...axiosConfig,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } else {
                    // unsuccessful refresh - refresh token expired
                    console.error(refreshResult[1]);
                    await authService.logout();
                    throw new Error("Invalid refresh token");
                }
            }
            else {
                throw err;
            }
        }
    },
    put: async (apiUrl, requestData, axiosConfig) => {
        try {
            const response = await axios.put(apiUrl, requestData, {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            return response;
        } catch (err) {
            if(err.response.data == "Invalid access token") {
                const refreshResult = await axiosPrivate.refreshRequest();
                if(refreshResult[0]) {
                    // successsful refresh
                    const response = await axios.put(apiUrl, requestData, {
                        ...axiosConfig,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } else {
                    // unsuccessful refresh - refresh token expired
                    console.error(refreshResult[1]);
                    await authService.logout();
                    throw new Error("Invalid refresh token");
                }
            }
            else {
                throw err;
            }
        }
    },
    patch: async (apiUrl, requestData, axiosConfig) => {
        try {
            const response = await axios.patch(apiUrl, requestData, {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            return response;
        } catch (err) {
            if(err.response.data == "Invalid access token") {
                const refreshResult = await axiosPrivate.refreshRequest();
                if(refreshResult[0]) {
                    // successsful refresh
                    const response = await axios.patch(apiUrl, requestData, {
                        ...axiosConfig,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } else {
                    // unsuccessful refresh - refresh token expired
                    console.error(refreshResult[1]);
                    await authService.logout();
                    throw new Error("Invalid refresh token");
                }
            }
            else {
                throw err;
            }
        }
    },
    delete: async (apiUrl, axiosConfig) => {
        try {
            const response = await axios.delete(apiUrl, {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            return response;
        } catch (err) {
            if(err.response.data == "Invalid access token") {
                const refreshResult = await axiosPrivate.refreshRequest();
                if(refreshResult[0]) {
                    // successsful refresh
                    const response = await axios.delete(apiUrl, {
                        ...axiosConfig,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } else {
                    // unsuccessful refresh - refresh token expired
                    console.error(refreshResult[1]);
                    await authService.logout();
                    throw new Error("Invalid refresh token");
                }
            }
            else {
                throw err;
            }
        }
    },
};

export default axiosPrivate;