import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7068/api',
    headers: {
        'Authorization': 'Bearer '   + localStorage.getItem("token")
    }
});

export default axiosInstance;