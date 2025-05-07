import axios from 'axios';

const api = axios.create({
    baseURL: 'http://130.185.118.115:8081',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;