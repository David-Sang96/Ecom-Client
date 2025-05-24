import axios from "axios";
import { toast } from "sonner";
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
    if (error.response?.status === 429) {
      toast.error("You have exceeded the rate limit. Please try again later.");
    }

    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      window.location.href = `/auth/login?redirectTo=${encodeURIComponent(
        currentPath,
      )}`;
    }
    return Promise.reject(error);
  },
);

export const fetchAuthApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

fetchAuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      toast.error("You have exceeded the rate limit. Please try again later.");
    }
    return Promise.reject(error);
  },
);

export default fetchApi;
