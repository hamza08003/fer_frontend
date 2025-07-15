import { token } from '@/utils/auth';
import axios from 'axios';

// Set the base URL for axios requests
const axios_ = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
});

axios_.interceptors.response.use (
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // status code outside of 2xx
        if (error.response && error.response.status === 401 && error.response.data.detail === 'Invalid token.') {
            // incase token is invalid, remove it
            console.log("Removing token from server");
            token.remove();
            window.location.href = '/login';
            window.location.reload();
        }
        return Promise.reject(error);
    }
)

export default axios_;

