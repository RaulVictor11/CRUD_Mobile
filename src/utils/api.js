import axios from 'axios';

const BASE_URL = 'http://192.168.18.31:8081'; 

const API = axios.create({

    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;
