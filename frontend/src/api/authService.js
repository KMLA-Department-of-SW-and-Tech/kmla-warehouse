import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';

const authService = {
    login: async (username, password) => { // returns true for successful login
        const response = await axios.post('/api/auth/login', { username, password }, {withCredentials: true});
        axiosPrivate.accessToken = response.data.accessToken;
        axiosPrivate.roles = response.data.roles;
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
        const response = await axiosPrivate.get('/api/auth', { withCredentials: true });
        return response.data.username;
    },
    changePassword: async (currentPassword, newPassword) => {
        await axiosPrivate.patch('/api/team/update-password', { currentPassword, newPassword }, { withCredentials: true });
    }
}


export default authService;