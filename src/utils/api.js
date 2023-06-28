import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const api = axios.create({
  headers: {
    Authorization: localStorage.getItem('userToken'),
  },
});

export default api;
