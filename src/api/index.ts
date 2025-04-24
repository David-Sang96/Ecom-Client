import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

const fetchApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

fetchApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      window.location.href = `/auth/login?redirectTo=${encodeURIComponent(
        currentPath
      )}`;
    }
  }
);

export default fetchApi;

export const fetchAuthApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
