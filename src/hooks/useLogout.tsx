import { useAuthStore } from "auth/authStore";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const logoutStore = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const logout = () => {
    logoutStore();
    navigate("/login", { replace: true });
  };

  return { logout };
}
