import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';
import Cookies from 'js-cookie';

const authService = {
    login: async (username, password) => { // returns true for successful login
        const response = await axios.post('/api/auth/login', { username, password });
        axiosPrivate.accessToken = response.data.accessToken;
        Cookies.set("logged_in", true);
    },
    logout: async () => {
        try {
            Cookies.remove("logged_in");
            await axios.post('/api/auth/logout');
            axiosPrivate.accessToken = "";
            console.log("Logged out");
        } catch (err) {
            console.error(err);
        }
    }
}

export default authService;