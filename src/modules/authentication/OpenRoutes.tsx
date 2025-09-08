import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthUtils } from "shared/auth/useAuthUtils";
import { useAuthStore } from "auth/authStore";

export function OpenRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { validateLifetimeToken } = useAuthUtils();
  const { loggedIn } = useAuthStore();

  useEffect(() => {
    (async () => {
      // Si el usuario está logueado en Zustand, valida el token
      if (loggedIn) {
        const updatedSession = await validateLifetimeToken(true);
        // Si hay token válido tras refresco, redirige
        if (updatedSession.token) {
          navigate("/stories", { replace: true });
        }
      }
    })();
  }, [location.pathname, loggedIn, validateLifetimeToken, navigate]);

  return <Outlet />;
}
