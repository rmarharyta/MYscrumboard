import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7068/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '   + localStorage.getItem("token")
    }
});

export default axiosInstance;