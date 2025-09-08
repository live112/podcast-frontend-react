import { direcciones, useAxiosAPI } from "@api/axiosInstance";
import { UserLoginRequest } from "types/authInterfaces";

export const useAuthAPI = () => {
  const { backendAPI } = useAxiosAPI();

  const login = async (request: UserLoginRequest) =>
    backendAPI.post(direcciones.auth + `/login`, request);

  const refreshToken = async (request: { refreshToken: string }) =>
    backendAPI.post("/auth/refresh", request);

  return {
    login,
    refreshToken,
  };
};
