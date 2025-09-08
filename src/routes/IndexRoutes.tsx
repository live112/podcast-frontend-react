import ChatPage from "@modules/chat";
import { Forbidden } from "@modules/landing/forbidden";
import { Home } from "@modules/landing/home";
import { LoginPage } from "@modules/landing/loginPage";
import { NotFound } from "@modules/authentication/NotFound";
import { OpenRoutes } from "@modules/authentication/OpenRoutes";
import { ProtectedRoutes } from "@modules/authentication/ProtectedRoutes";
import { RegisterPage } from "@modules/landing/registerPage";
import { Route, Routes } from "react-router-dom";
import StoriesPage from "@modules/stories";

export function IndexRoutes() {
  return (
    <Routes>
      <Route element={<OpenRoutes />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* ...Otras rutas públicas */}
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="chat" element={<ChatPage />} />
        <Route path="stories" element={<StoriesPage />} />
        <Route path="forbidden" element={<Forbidden />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
