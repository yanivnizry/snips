import axios from 'axios';

export const axiosClient = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

