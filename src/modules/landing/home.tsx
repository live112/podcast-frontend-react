import { animationStyles } from "@styles/animationStyles";
import { BackgroundElements } from "@components/landing/backgroundElements";
import { Button, Link } from "@heroui/react";
import { GlassCard } from "@components/landing/glassCard";
import { LandingNavbar } from "@components/landing/landingNavbar";

export function Home() {
  const mainEpisode = {
    title: "Arquitectura móvil en 2025: patrones, nube y escalabilidad",
    src: `${import.meta.env.BASE_URL}audio/episodio.mp3`,
    description:
      "Un recorrido práctico por los modelos arquitectónicos (MVC, MVP, MVVM, Clean Architecture), integración con la nube, almacenamiento local con sync, microservicios y retos con IA, IoT y AR.",
  };

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
