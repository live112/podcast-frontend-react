import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthUtils } from "shared/auth/useAuthUtils";
import { addToast } from "@heroui/react";

export function ProtectedRoutes() {
  const location = useLocation();
  const { validateLifetimeToken } = useAuthUtils();

  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await validateLifetimeToken(true); // intenta validar o refrescar
        setIsValid(true);
      } catch (error) {
        addToast({
          title: "Sesión caducada",
          description: "Por favor inicia sesión nuevamente",
          color: "danger",
        });
        setIsValid(false);
      }
    };

    checkSession();
  }, [location.pathname]);

  // Para mantener la vista al recargar la ventana
  if (isValid === null) {
    return <Outlet />;
  }

  return isValid ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
