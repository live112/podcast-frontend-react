import { Forbidden } from "@modules/landing/forbidden";
import { Home } from "@modules/landing/home";
import { NotFound } from "@modules/authentication/NotFound";
import { OpenRoutes } from "@modules/authentication/OpenRoutes";
import { ProtectedRoutes } from "@modules/authentication/ProtectedRoutes";
import { Route, Routes } from "react-router-dom";

export function IndexRoutes() {
  return (
    <Routes>
      <Route element={<OpenRoutes />}>
        <Route index element={<Home />} />
        {/* ...Otras rutas públicas */}
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="forbidden" element={<Forbidden />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
