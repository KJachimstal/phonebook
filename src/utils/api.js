import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const api = axios.create({
  headers: {
    Authorization: {
      toString() {
        return localStorage.getItem('userToken');
      },
    },
  },
});

export default api;
