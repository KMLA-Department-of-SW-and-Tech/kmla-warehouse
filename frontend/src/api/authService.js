import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';

const authService = {
    login: async (username, password) => { // returns true for successful login
        const response = await axios.post('/api/auth/login', { username, password }, {withCredentials: true});
        axiosPrivate.accessToken = response.data.accessToken;
    },
    logout: async () => {
        try {
            await axios.post('/api/auth/logout', {}, {withCredentials: true});
            axiosPrivate.accessToken = "";
            console.log("Logged out");
        } catch (err) {
            console.error(err);
        }
    },
    currentUser: async () => {
        try {
          const response = await axios.get('/api/auth');
          console.log(response.data);
          return response.data.username;
        } catch (err) {
          console.error(err);
        }
    },
}


export default authService;