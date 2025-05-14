import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.form-fatewebsite.website/api/v1', 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;