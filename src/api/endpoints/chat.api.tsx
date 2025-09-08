import { direcciones } from "@api/axiosInstance";
import { useAxiosPrivateAPI } from "@api/axiosPrivate";

export const useStoriesAPI = () => {
  const { backendAPIPrivate } = useAxiosPrivateAPI();

  const createStory = async (data: {
    title: string;
    creator_id: string;
    first_line: string;
  }) => backendAPIPrivate.post(direcciones.stories + `/create`, data);

  const getStories = async () => backendAPIPrivate.get(direcciones.stories);

  return {
    createStory,
    getStories,
  };
};
