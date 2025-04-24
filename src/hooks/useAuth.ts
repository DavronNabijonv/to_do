import { useMutation } from "@tanstack/react-query";
import { request } from "../api/apiAxios";

export const useRegister = () => {
  return useMutation({
    mutationFn: (user: { username: string; password: string }) =>
      request("/auth/register", "POST", user),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (user: { username: string; password: string }) => {
      const res = await request<{ access_token: string }>("/auth/login", "POST", user);
      localStorage.setItem("token", res.access_token); 
      return res;
    },
  });
};
