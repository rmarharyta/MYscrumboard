import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5151/api',
    headers: {
        'Authorization': 'Bearer '   + localStorage.getItem("token")
    }
});

export default axiosInstance;