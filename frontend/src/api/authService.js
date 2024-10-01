import axios from 'axios';
import axiosPrivate from '../hooks/axiosPrivate';
import Cookies from 'js-cookie';

const authService = {
    login: async (username, password) => { // returns true for successful login
        const response = await axios.post('/api/auth/login', { username, password }, {withCredentials: true});
        axiosPrivate.accessToken = response.data.accessToken;
        Cookies.set("logged_in", true);
    },
    logout: async () => {
        try {
            Cookies.remove("logged_in");
            await axios.post('/api/auth/logout', {}, {withCredentials: true});
            axiosPrivate.accessToken = "";
            console.log("Logged out");
        } catch (err) {
            console.error(err);
        }
    },
    currentUser: async () => {

      try {
        const response = await axios.post('/api/auth');
        console.log(response.data);
        return response.data.username;
      } catch (err) {
        console.error(err);

      }
    },
    changePassword: async (currentPassword, newPassword) => {
      try {
        const response = await axiosPrivate.patch("/api/team/update-password", {
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        console.log(response);  
      } catch(err) {
        console.log(err);
      }
    }
}

export default authService;