import { direcciones } from "@api/axiosInstance";
import { useAxiosPrivateAPI } from "@api/axiosPrivate";
import { LineRequest } from "types/lineInterfaces";

export const useLinesAPI = () => {
  const { backendAPIPrivate } = useAxiosPrivateAPI();

  const sendLine = async (story_id: string, request: LineRequest) =>
    backendAPIPrivate.post(direcciones.lines + `/${story_id}`, request);

  const getLines = async (story_id: string) =>
    backendAPIPrivate.get(direcciones.lines + `/${story_id}`);

  return {
    sendLine,
    getLines,
  };
};