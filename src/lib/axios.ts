import axios from 'axios';

// Set the base URL for axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/';

