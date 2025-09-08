import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Logo } from "@components/icons";
import { siteConfig } from "config/site";
import { ThemeSwitch } from "@components/theme-switch";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

export const LandingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Determinar si estamos en una página de auth
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-white/20 dark:border-white/10"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <Logo />
            <p className="font-bold text-inherit bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text">
              Programines
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {/* Botones de autenticación - solo mostrar si no estamos en páginas de auth */}
        {!isAuthPage && (
          <>
            {/* <NavbarItem className="hidden sm:flex"> */}
            {/* <Button
                variant="light"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                onClick={handleLoginClick}
              >
                Iniciar sesión
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300"
                onClick={handleRegisterClick}
              >
                Registrarse
              </Button> */}
            {/* </NavbarItem> */}
          </>
        )}

        {/* Si estamos en página de auth, mostrar enlace al otro formulario */}
        {isAuthPage && (
          <NavbarItem className="hidden sm:flex">
            {location.pathname === "/login" ? (
              <Button
                variant="light"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                onClick={handleRegisterClick}
              >
                ¿No tienes cuenta? Regístrate
              </Button>
            ) : (
              <Button
                variant="light"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                onClick={handleLoginClick}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Button>
            )}
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="backdrop-blur-md bg-white/90 dark:bg-black/90">
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* Enlaces de navegación normales */}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* Divisor */}
          <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>

          {/* Botones de autenticación en menú móvil */}
          {!isAuthPage ? (
            <>
              <NavbarMenuItem>
                <Button
                  variant="light"
                  className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={handleLoginClick}
                >
                  Iniciar sesión
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:scale-105 transition-all duration-300"
                  onClick={handleRegisterClick}
                >
                  Registrarse
                </Button>
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem>
              {location.pathname === "/login" ? (
                <Button
                  variant="light"
                  className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={handleRegisterClick}
                >
                  ¿No tienes cuenta? Regístrate
                </Button>
              ) : (
                <Button
                  variant="light"
                  className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  onClick={handleLoginClick}
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </Button>
              )}
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
