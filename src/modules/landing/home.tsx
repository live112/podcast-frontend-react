import { animationStyles } from "@styles/animationStyles";
import { BackgroundElements } from "@components/landing/backgroundElements";
import { Button, Link } from "@heroui/react";
import { GlassCard } from "@components/landing/glassCard";
import { LandingNavbar } from "@components/landing/landingNavbar";

export function Home() {
  const mainEpisode = {
    title: "Arquitectura móvil en 2025: patrones, nube y escalabilidad",
    src: `${import.meta.env.BASE_URL}public/audio/episodio.mp3`,
    description:
      "Un recorrido práctico por los modelos arquitectónicos (MVC, MVP, MVVM, Clean Architecture), integración con la nube, almacenamiento local con sync, microservicios y retos con IA, IoT y AR.",
  };

  const stories = [
    {
      id: 1,
      title:
        "Modelos arquitectónicos comunes: MVC, MVP, MVVM y Clean Architecture",
      description:
        "Cuándo usar cada patrón, separación de responsabilidades y ejemplos en apps reales.",
      status: "No disponible",
    },
    {
      id: 2,
      title: "Integración con servicios en la nube",
      description:
        "Autenticación, funciones serverless, APIs y despliegues con proveedores populares.",
      status: "No disponible",
    },
    {
      id: 3,
      title: "Almacenamiento local y sincronización con la nube",
      description:
        "Estrategias offline-first, conflictos de sincronización y cifrado en reposo/en tránsito.",
      status: "No disponible",
    },
    {
      id: 4,
      title: "Escalabilidad y microservicios en apps móviles modernas",
      description:
        "Diseño de backend para crecimiento, observabilidad y límites de servicio.",
      status: "No disponible",
    },
    {
      id: 5,
      title: "Retos arquitectónicos con IA, IoT y realidad aumentada",
      description:
        "Patrones para inferencia on-device, telemetría de dispositivos y experiencias inmersivas.",
      status: "No disponible",
    },
  ];

  return (
    <>
      <style>{animationStyles}</style>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        <BackgroundElements />

        <section className="relative min-h-screen flex flex-col">
          <LandingNavbar />
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-slate-900 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    Programines Podcast
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
                Conversaciones prácticas sobre patrones (MVC/MVP/MVVM/Clean),
                integración con la nube, almacenamiento local con
                sincronización, microservicios y los retos que traen la IA, IoT
                y la realidad aumentada.
              </p>

              {/* 🎧 Reproductor principal */}
              <div className="max-w-2xl mx-auto mb-8">
                <GlassCard>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {mainEpisode.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {mainEpisode.description}
                    </p>
                    <audio controls className="w-full">
                      <source src={mainEpisode.src} type="audio/mpeg" />
                      Tu navegador no soporta la reproducción de audio.
                    </audio>
                    <div className="mt-4 flex gap-3">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-4 py-2"
                        onPress={() => {
                          const el = document.querySelector("audio");
                          el?.play?.();
                        }}
                      >
                        Reproducir
                      </Button>
                      <Link
                        href={mainEpisode.src}
                        className="text-sm text-blue-600 dark:text-blue-400 underline"
                        download
                      >
                        Descargar episodio (MP3)
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* Episodios */}
        <section className="relative py-20 bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-800/50">
          <BackgroundElements />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Episodios recientes
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                Explora los episodios y profundiza en las decisiones
                arquitectónicas que marcan la diferencia en apps móviles
                modernas. No hay ninguno realmente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {stories.map((story) => (
                <GlassCard key={story.id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {story.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          story.status === "Disponible"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        }`}
                      >
                        {story.status}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                      {story.description}
                    </p>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium transition-all duration-300"
                      size="sm"
                    >
                      Escuchar episodio
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="container mx-auto max-w-7xl px-6 py-12">
            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                Enlaces adicionales - No hay ninguno en realidad
              </p>

              <div className="flex justify-center items-center gap-3">
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  UTNG
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
