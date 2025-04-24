import axios, { AxiosRequestConfig, Method } from "axios";

const api = axios.create({
  baseURL: "http://185.217.131.96:4949",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const request = async <T = any>(
  url: string,
  method: Method = "GET",
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api({ url, method, data, ...config });
  return response.data;
};
