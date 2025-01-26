import axios from 'axios';

const adminAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

adminAxiosInstance.interceptors.request.use((config) => {
  const adminToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('adminToken='))
    ?.split('=')[1];

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
    config.headers['X-User-Role'] = 'admin'; 
  }
  return config;
});

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie = 'adminToken=; Max-Age=0; path=/;';
      window.location.href = '/admin/login'; 
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;