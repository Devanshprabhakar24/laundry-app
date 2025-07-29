import axios from 'axios';

// Create a central Axios instance
const api = axios.create({
  // Use environment variables for the backend URL, with a fallback for local development
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Important for sending cookies if needed
});

export default api;