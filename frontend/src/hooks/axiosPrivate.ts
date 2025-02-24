import axios from 'axios';

// use try catch

const axiosPrivate: {
    accessToken: string,
    roles: string[],
    refreshRequest: () => Promise<void>,
    get: (apiUrl: string, axiosConfig?: object) => Promise<any>,
    post: (apiUrl: string, requestData: any, axiosConfig?: object) => Promise<any>,
    put: (apiUrl: string, requestData: any, axiosConfig?: object) => Promise<any>,
    patch: (apiUrl: string, requestData: any, axiosConfig?: object) => Promise<any>,
    delete: (apiUrl: string, axiosConfig?: object) => Promise<any>
} = {
    accessToken: "",
    roles: [],
    refreshRequest: async () => { // internal function do not use outside
        console.log("Refreshing...");
        const result = await axios.get("/api/refresh", { withCredentials: true });
        axiosPrivate.accessToken = result.data.accessToken;
        axiosPrivate.roles = result.data.roles;
    },
    get: async (apiUrl, axiosConfig) => {
        try {
            const response = await axios.get(apiUrl, {
                ...axiosConfig,
                withCredentials: true,
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
                        withCredentials: true,
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
        console.log("running post");
        try {
            console.log("before response", apiUrl, requestData);
            const response = await axios.post(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${axiosPrivate.accessToken}`
                }
            });
            console.log("after response", response);
            return response;
        } catch (err) {
            console.log("catch at post");
            if (err.response) {
                console.log("Error response data:", err.response.data);
                console.log("Status code:", err.response.status);
            }
            if (err.response && err.response.data === "Invalid access token") {
                // 토큰 만료로 인한 새로고침 처리
                try {
                    await axiosPrivate.refreshRequest();
                    const response = await axios.post(apiUrl, requestData, {
                        ...axiosConfig,
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${axiosPrivate.accessToken}`
                        }
                    });
                    return response;
                } catch (err) {
                    console.log("Unsuccessful refresh");
                    throw err;
                }
            } else {
                console.error("Request failed with error:", err.message);
                throw err;
            }
        }
    },
    put: async (apiUrl, requestData, axiosConfig) => {
        try {
            const response = await axios.put(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
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
                    const response = await axios.put(apiUrl, requestData, {
                        ...axiosConfig,
                        withCredentials: true,
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
    patch: async (apiUrl, requestData, axiosConfig) => {
        try {
            const response = await axios.patch(apiUrl, requestData, {
                ...axiosConfig,
                withCredentials: true,
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
                    const response = await axios.patch(apiUrl, requestData, {
                        ...axiosConfig,
                        withCredentials: true,
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
    delete: async (apiUrl, axiosConfig) => {
        try {
            const response = await axios.delete(apiUrl, {
                ...axiosConfig,
                withCredentials: true,
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
                    const response = await axios.delete(apiUrl, {
                        ...axiosConfig,
                        withCredentials: true,
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
};

export default axiosPrivate;