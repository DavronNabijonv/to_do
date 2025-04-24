import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../api/apiAxios";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => request("/todos"),
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: { title: string,description:string }) =>
      request("/todos", "POST", todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useTodoById = (id: string) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => request(`/todos/${id}`),
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; update: any }) =>
      request(`/todos/${data.id}`, "PUT", data.update),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => request(`/todos/${id}`, "DELETE"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
