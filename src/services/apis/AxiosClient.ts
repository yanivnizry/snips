import axios from 'axios';
import {API_BASE_URL} from '../config/env';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
      return Promise.reject(new Error('Network error: No response from server'));
    } else {
      return Promise.reject(error);
    }
  },
);

