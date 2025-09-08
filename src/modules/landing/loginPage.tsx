import { addToast, Button, Input, Link } from "@heroui/react";
import { animationStyles } from "@styles/animationStyles";
import { BackgroundElements } from "@components/landing/backgroundElements";
import { GlassCard } from "@components/landing/glassCard";
import { Icon } from "@iconify/react";
import { useAuthAPI } from "@api/endpoints/auth.api";
import { useAuthStore } from "auth/authStore";
import { useNavigate } from "react-router-dom";
import { UserLoginRequest } from "types/authInterfaces";
import { useState } from "react";

export function LoginPage() {
  const { login } = useAuthAPI();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const userLoginRequest: UserLoginRequest = {
        email: email.trim(),
        password: password,
      };
      const response = await login(userLoginRequest);

      useAuthStore.getState().setAuth(response.data);

      addToast({
        title: "Bienvenido",
        description: "Sesión iniciada correctamente",
        color: "success",
      });

      navigate("/stories");
    } catch (err: any) {
      addToast({
        title: "Sin acceso",
        description:
          "Verifica que el correo electrónico y la contraseña sean correctos",
        color: "danger",
      });

      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
        <BackgroundElements />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Programines
                </span>
              </h1>
            </Link>
            <p className="text-slate-600 dark:text-slate-400">
              Inicia sesión para continuar
            </p>
          </div>

          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Bienvenido de vuelta
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Ingresa tus credenciales para acceder a tu cuenta
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: [
                      "bg-transparent",
                      "border-0",
                      "focus:border-0",
                      "focus:ring-0",
                      "focus:outline-none",
                    ],
                    inputWrapper: [
                      "backdrop-blur-sm",
                      "bg-white/50",
                      "dark:bg-black/50",
                      "border",
                      "border-white/30",
                      "dark:border-white/20",
                      "hover:border-white/50",
                      "dark:hover:border-white/30",
                      "focus-within:border-blue-400/50",
                      "dark:focus-within:border-blue-400/50",
                      "transition-all",
                      "duration-200",
                      "!outline-none",
                      "shadow-sm",
                    ],
                    label: "text-slate-700 dark:text-slate-300",
                    base: "!outline-none",
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: [
                      "bg-transparent",
                      "border-0",
                      "focus:border-0",
                      "focus:ring-0",
                      "focus:outline-none",
                    ],
                    inputWrapper: [
                      "backdrop-blur-sm",
                      "bg-white/50",
                      "dark:bg-black/50",
                      "border",
                      "border-white/30",
                      "dark:border-white/20",
                      "hover:border-white/50",
                      "dark:hover:border-white/30",
                      "focus-within:border-blue-400/50",
                      "dark:focus-within:border-blue-400/50",
                      "transition-all",
                      "duration-200",
                      "!outline-none",
                      "shadow-sm",
                    ],
                    label: "text-slate-700 dark:text-slate-300",
                    base: "!outline-none",
                  }}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <Icon
                          icon="heroicons:eye-slash-16-solid"
                          width="16"
                          height="16"
                        />
                      ) : (
                        <Icon
                          icon="heroicons:eye-16-solid"
                          width="16"
                          height="16"
                        />
                      )}
                    </button>
                  }
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 transition-all duration-300"
                size="lg"
                isLoading={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </form>
          </GlassCard>

          <div className="text-center mt-8">
            <div className="flex justify-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
