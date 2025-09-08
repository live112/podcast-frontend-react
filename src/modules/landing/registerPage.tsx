import { BackgroundElements } from "@components/landing/backgroundElements";
import { Button, Input, Link } from "@heroui/react";
import { GlassCard } from "@components/landing/glassCard";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { animationStyles } from "@styles/animationStyles";
import { useUserAPI } from "@api/endpoints/user.api";
import { UserCreateRequest } from "types/userInterfaces";

export function RegisterPage() {
  const { registerUser } = useUserAPI();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = () => {
    if (!name.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    if (!email.trim()) {
      setError("El email es requerido");
      return false;
    }
    if (!password) {
      setError("La contraseña es requerida");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const createUserRequest: UserCreateRequest = {
        name: name.trim(),
        email: email.trim(),
        password: password,
      };

      await registerUser(createUserRequest);

      setSuccess(true);

      // Redirigir al login después de un tiempo
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Error al crear la cuenta";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <style>{animationStyles}</style>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
          <BackgroundElements />

          <div className="w-full max-w-md relative z-10">
            <GlassCard>
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                  <Icon
                    icon="heroicons:check-16-solid"
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                  />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  ¡Cuenta creada exitosamente!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Te redirigiremos al inicio de sesión en un momento...
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Iniciar sesión ahora
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </>
    );
  }

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
              Crea tu cuenta para comenzar
            </p>
          </div>

          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Crear cuenta
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Completa tus datos para registrarte
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Input
                  type="text"
                  label="Nombre completo"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="Mínimo 6 caracteres"
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

              <div className="space-y-2">
                <Input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  label="Confirmar contraseña"
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
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
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>

              <div className="text-center pt-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Inicia sesión aquí
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
