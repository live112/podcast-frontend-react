import { useAxiosAPI, direcciones } from "@api/axiosInstance";
import { UserCreateRequest } from "types/userInterfaces";

export const useUserAPI = () => {
  const { backendAPI } = useAxiosAPI();

  const registerUser = (request: UserCreateRequest) =>
    backendAPI.post(direcciones.users + `/create`, request);

  return {
    registerUser,
  };
};
