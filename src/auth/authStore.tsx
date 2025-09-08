// authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session, NewSession } from "types/authInterfaces";

interface AuthState extends Session {
  setAuth: (session: Session) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...NewSession(),

      setAuth: (session) => set(session),
      logout: () => set(NewSession()),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
