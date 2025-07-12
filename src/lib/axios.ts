import axios from 'axios';

// Set the base URL for axios requests
const axios_ = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
});

export default axios_;

