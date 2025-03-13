import { api } from "./aip";

export const getUsers = async () => {
  const response = await api.get("/users"); // Gọi API từ backend NestJS
  return response.data;
};
