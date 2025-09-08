import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useAuthAPI } from "@api/endpoints/auth.api";
import { useAuthStore } from "auth/authStore";
import { NewSession, Session } from "types/authInterfaces";

export function useAuthUtils() {
  const { refreshToken: apiRefresh } = useAuthAPI();

  const validateLifetimeToken = async (
    shouldRefresh: boolean
  ): Promise<Session> => {
    const session = useAuthStore.getState();
    let isValid = false;

    if (session.token) {
      const payload: any = jwtDecode(session.token);
      if (payload.exp) {
        isValid = dayjs().isBefore(dayjs.unix(payload.exp));
      }
    }

    if (!isValid && shouldRefresh && session.refreshToken) {
      try {
        const { data } = await apiRefresh({
          refreshToken: session.refreshToken,
        });

        const newSession = {
          ...session,
          token: data.token,
          expiresIn: data.expiresIn,
          loggedIn: true,
        };

        useAuthStore.getState().setAuth(newSession);
        isValid = true;

        return newSession;
      } catch {
        isValid = false;
      }
    }

    return isValid ? session : NewSession();
  };

  return {
    validateLifetimeToken,
  };
}
