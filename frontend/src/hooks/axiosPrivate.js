import axios from 'axios';

// use try catch

const axiosPrivate = {
    accessToken: "",
    roles: [],
    refreshRequest: async () => { // internal function do not use outside
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
            if(err.response.data == "Invalid access token") {
                try {
                    await axiosPrivate.refreshRequest();
                    // successsful refresh
                    const response = await axios.post(apiUrl, requestData, {
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