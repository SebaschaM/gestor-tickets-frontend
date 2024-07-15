// apiInstance.js
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { handleRefreshToken } from "../services/refreshTokenService";

const apiTicketsProject = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

apiTicketsProject.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiTicketsProject.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await handleRefreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return apiTicketsProject(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiTicketsProject;
