import axios from "axios";
import { baseURL } from "@context/EnvContext";
import { useAuthUtils } from "shared/auth/useAuthUtils";
import { useEffect } from "react";
import { useLoader } from "@context/LoaderContext";
import { useLogout } from "hooks/useLogout";
import { useNavigate } from "react-router-dom";

export const useAxiosPrivateAPI = () => {
  const { setIsLoading } = useLoader();
  const navigate = useNavigate();
  const logout = useLogout().logout;
  const validateLifetimeToken = useAuthUtils().validateLifetimeToken;

  const backend = axios.create({ baseURL, withCredentials: true });

  useEffect(() => {
    const reqI = backend.interceptors.request.use(
      async (config) => {
        setIsLoading(true);
        const session = await validateLifetimeToken(true);
        if (!config.headers.Authorization && session.token) {
          config.headers.Authorization = `Bearer ${session.token}`;
        }
        return config;
      },
      (e) => {
        setIsLoading(false);
        return Promise.reject(e);
      }
    );

    const resI = backend.interceptors.response.use(
      (r) => {
        setIsLoading(false);
        return r;
      },
      async (err) => {
        setIsLoading(false);
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
          original._retry = true;
          try {
            const session = await validateLifetimeToken(true);
            if (session.token) {
              original.headers.Authorization = `Bearer ${session.token}`;
              return backend(original);
            }
          } catch {
            logout();
            navigate("/login", { replace: true });
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      backend.interceptors.request.eject(reqI);
      backend.interceptors.response.eject(resI);
    };
  }, [validateLifetimeToken, logout, navigate, setIsLoading]);

  return { backendAPIPrivate: backend };
};
