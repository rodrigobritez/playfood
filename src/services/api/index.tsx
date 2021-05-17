import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5ff37c3328c3980017b195e8.mockapi.io/api/',
    timeout: 1000,
});

export {api}