import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';
import Cookies from 'js-cookie';

const authService = {
    login: async (username, password) => { // returns true for successful login
        const response = await axios.post('/api/auth/login', { username, password });
        axiosPrivate.accessToken = response.data.accessToken;
        Cookies.set("Logged_In", true);
    },
    logout: async () => {
        try {
            await axios.post('/api/auth/logout');
            axiosPrivate.accessToken = "";
            console.log("Logged out");
            Cookies.remove("Logged_In")
        } catch (err) {
            console.error(err);
        }
    }
}

export default authService;