import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Set authorization header to Bearer token
  const accessToken = getLocalStorage("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Refresh token interceptor
api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;

  if (
    error.response?.data?.code === "TOKEN_EXPIRED" &&
    originalRequest &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      const response = await api.post("/auth/refresh-token");

      const newAccessToken = response.data.data.accessToken;

      setLocalStorage("accessToken", newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  if (error.response?.data?.code === "TOKEN_MISSING") {
    console.log("Token missing");
    return Promise.reject(error.response.data.message);
  }

  return Promise.reject(error);
});

export default api;
