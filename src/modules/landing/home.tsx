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

  const sections = [
    {
      id: "intro",
      title: "INVESTIGACIÓN ASISTIDA CON IA",
      content: (
        <>
          <p className="mb-2">
            La arquitectura de aplicaciones móviles constituye el marco
            estructural fundamental que define cómo se organizan los componentes
            de una aplicación, cómo interactúan entre sí y con sistemas
            externos, y cómo se gestionan los datos y la lógica de negocio. Una
            arquitectura bien diseñada es crucial para construir aplicaciones
            escalables, mantenibles y robustas que puedan evolucionar con las
            demandas del mercado y las tecnologías emergentes.
          </p>
          <p className="mb-2">
            Según los principios de ingeniería de software, una arquitectura
            adecuada facilita las pruebas, mejora el rendimiento y permite la
            colaboración eficiente entre desarrolladores.
          </p>
        </>
      ),
    },

    {
      id: "modelos",
      title: "2. Modelos Arquitectónicos Comunes",
      content: (
        <div className="space-y-4">
          <section>
            <h4 className="font-semibold">2.1. MVC (Model-View-Controller)</h4>
            <p className="mt-1">
              Concepto: Patrón clásico que separa la aplicación en tres
              componentes: Modelo (datos y lógica), Vista (interfaz de usuario)
              y Controlador (mediador que gestiona las interacciones).
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <strong>Ventajas:</strong> Separación clara de
                responsabilidades, ampliamente conocido.
              </li>
              <li>
                <strong>Desventajas:</strong> En Android la Vista y el
                Controlador a menudo están acoplados (ej: Activity), lo que
                puede llevar a clases masivas y dificultad para pruebas
                unitarias; puede provocar sobrecarga de datos si se implementa
                incorrectamente.
              </li>
              <li>
                <strong>Uso ideal:</strong> Pequeños proyectos o prototipos
                rápidos.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold">2.2. MVP (Model-View-Presenter)</h4>
            <p className="mt-1">
              Concepto: Evolución del MVC donde el Presentador actúa como
              intermediario que contiene la lógica de presentación. La Vista es
              pasiva y se comunica con el Presentador, que actualiza el Modelo y
              la Vista.
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <strong>Ventajas:</strong> Mejor separación que MVC, más fácil
                de probar, sigue el principio de responsabilidad única.
              </li>
              <li>
                <strong>Desventajas:</strong> Puede generar código boilerplate y
                volverse complejo en proyectos grandes.
              </li>
              <li>
                <strong>Uso ideal:</strong> Aplicaciones de complejidad media.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold">2.3. MVVM (Model-View-ViewModel)</h4>
            <p className="mt-1">
              Concepto: Patrón moderno que utiliza un ViewModel para exponer
              datos y estado de la Vista. Se aprovecha del enlace de datos (data
              binding) para actualizaciones automáticas de la UI.
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <strong>Ventajas:</strong> Acoplamiento bajo, alta testabilidad
                del ViewModel, ideal para UIs impulsadas por datos y flujos
                complejos.
              </li>
              <li>
                <strong>Desventajas:</strong> Curva de aprendizaje por conceptos
                de programación reactiva, puede dificultar el debugging si el
                data binding es muy complejo.
              </li>
              <li>
                <strong>Uso ideal:</strong> Proyectos grandes con UIs complejas
                y dinámicas.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold">2.4. Clean Architecture</h4>
            <p className="mt-1">
              Concepto: Organiza el código en capas concéntricas (Presentation,
              Domain, Data) con la regla de dependencia: las dependencias solo
              apuntan hacia adentro.
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <strong>Principios:</strong> Independiente de frameworks,
                testeable, independiente de la UI y la base de datos.
              </li>
              <li>
                <strong>Ventajas:</strong> Máxima separación de preocupaciones,
                facilita el intercambio de componentes, altamente escalable y
                mantenible.
              </li>
              <li>
                <strong>Desventajas:</strong> Complejidad inicial y puede ser
                over-engineering para proyectos pequeños.
              </li>
              <li>
                <strong>Uso ideal:</strong> Aplicaciones grandes y complejas
                donde la mantenibilidad y testabilidad son críticas.
              </li>
            </ul>
          </section>

          <section>
            <h4 className="font-semibold">2.5. MVI (Model-View-Intent)</h4>
            <p className="mt-1">
              Concepto: Patrón reactivo y de flujo unidireccional. El Usuario
              emite Intents, que se procesan para actualizar el Estado (Model),
              y la Vista renderiza ese estado.
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                <strong>Ventajas:</strong> Estado predecible e inmutable, fácil
                de debuggear.
              </li>
              <li>
                <strong>Desventajas:</strong> Curva de aprendizaje y posible
                código boilerplate para estados e intents.
              </li>
              <li>
                <strong>Uso ideal:</strong> Aplicaciones con flujos de UI muy
                complejos e interactivos.
              </li>
            </ul>
          </section>
        </div>
      ),
    },

    {
      id: "nube",
      title: "3. Integración con Servicios en la Nube",
      content: (
        <div>
          <p className="mb-2">
            La computación en la nube para móviles (MCC) externaliza la potencia
            de procesamiento, el almacenamiento y otras funcionalidades a
            infraestructuras remotas, permitiendo que las apps móviles sean más
            ligeras, potentes y escalables.
          </p>

          <h5 className="font-semibold mt-3">Modelos de Servicio</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>IaaS:</strong> Infraestructura (servidores,
              almacenamiento, redes). Ej: Google Compute Engine.
            </li>
            <li>
              <strong>PaaS:</strong> Plataforma con herramientas para
              desarrollar y ejecutar apps. Ej: Google App Engine.
            </li>
            <li>
              <strong>SaaS:</strong> Software completo alojado por el proveedor.
              Ej: Gmail, Slack.
            </li>
          </ul>

          <h5 className="font-semibold mt-3">Ventajas Clave</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Alcance y accesibilidad multiplataforma.</li>
            <li>Análisis en tiempo real y centralizado.</li>
            <li>Mejor experiencia de usuario con recursos cloud-backed.</li>
            <li>Rentabilidad mediante pago por uso.</li>
          </ul>

          <h5 className="font-semibold mt-3">Casos de Uso Comunes</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Experiencias interactivas y streaming.</li>
            <li>Redes sociales y manejo de archivos grandes.</li>
            <li>E-commerce con búsquedas inteligentes.</li>
            <li>Videojuegos móviles con game streaming.</li>
            <li>
              Sanidad: registros médicos seguros y notificaciones en tiempo
              real.
            </li>
          </ul>
        </div>
      ),
    },

    {
      id: "sync",
      title: "4. Uso de Almacenamiento Local y Sincronización con la Nube",
      content: (
        <div>
          <p className="mb-2">
            Las aplicaciones móviles modernas often operan en contextos con
            conectividad intermitente, haciendo crucial una estrategia de datos
            robusta.
          </p>

          <h5 className="font-semibold mt-3">Almacenamiento Local</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Bases de datos locales: SQLite, Room, Realm.</li>
            <li>
              Almacenamiento clave-valor: SharedPreferences (Android),
              UserDefaults (iOS).
            </li>
            <li>Almacenamiento en archivo para assets y caché.</li>
          </ul>

          <h5 className="font-semibold mt-3">Sincronización con la Nube</h5>
          <p className="mt-1">Estrategias:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Sincronización bidireccional (2-way sync) con resolución de
              conflictos.
            </li>
            <li>Sincronización en background con trabajos programados.</li>
            <li>
              Sincronización bajo demanda para descargar solo lo necesario.
            </li>
          </ul>

          <h5 className="font-semibold mt-3">Tecnologías y Servicios</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Firebase Realtime Database / Firestore: sincronización automática
              y offline.
            </li>
            <li>APIs RESTful: control manual de caching y conflictos.</li>
            <li>
              GraphQL: obtener solo los campos necesarios para optimizar la red.
            </li>
          </ul>

          <h5 className="font-semibold mt-3">Consideraciones Clave</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Gestión de conflictos: merges automáticos o interacción con el
              usuario.
            </li>
            <li>
              Experiencia offline: almacenar operaciones para sincronizar
              después.
            </li>
            <li>Eficiencia: minimizar consumo de batería y datos.</li>
          </ul>
        </div>
      ),
    },

    {
      id: "microservicios",
      title: "5. Escalabilidad y Microservicios",
      content: (
        <div>
          <p className="mb-2">
            La arquitectura en la nube permite agrupar, compartir y escalar
            recursos de forma elástica según la demanda.
          </p>

          <h5 className="font-semibold mt-3">Escalado</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>Horizontal:</strong> añadir instancias.
            </li>
            <li>
              <strong>Vertical:</strong> aumentar recursos de una instancia.
            </li>
          </ul>

          <h5 className="font-semibold mt-3">Microservicios</h5>
          <p className="mt-1">
            Concepto: servicios pequeños, independientes y débilmente acoplados
            que se comunican mediante APIs.
          </p>

          <h5 className="font-semibold mt-3">Ventajas</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Escalado independiente.</li>
            <li>Agilidad en despliegues.</li>
            <li>Mejor resiliencia y diversidad tecnológica.</li>
          </ul>

          <h5 className="font-semibold mt-3">Desafíos</h5>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Complejidad de despliegue y monitorización.</li>
            <li>Latencia de comunicación entre servicios.</li>
            <li>Consistencia de datos (patrón Saga).</li>
          </ul>
        </div>
      ),
    },

    {
      id: "emergentes",
      title: "6. Retos Arquitectónicos con Tecnologías Emergentes",
      content: (
        <div className="space-y-3">
          <section>
            <h5 className="font-semibold">
              6.1. Inteligencia Artificial (IA) y ML
            </h5>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                On-device (ONNX/TensorFlow Lite): velocidad y privacidad; reto:
                optimizar para hardware móvil heterogéneo.
              </li>
              <li>
                Inferencia en la nube: para modelos complejos; reto: latencia y
                coste.
              </li>
              <li>
                Arquitectura híbrida: balancear inferencia on-device y cloud.
              </li>
            </ul>
          </section>

          <section>
            <h5 className="font-semibold">6.2. Internet de las Cosas (IoT)</h5>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                Comunicación M2M: BLE, WiFi, MQTT, CoAP; reto: conectividad
                heterogénea.
              </li>
              <li>
                Procesamiento de flujos en tiempo real; reto: ingestión y
                reacción en tiempo real.
              </li>
              <li>Seguridad: autenticación y autorización robustas.</li>
            </ul>
          </section>

          <section>
            <h5 className="font-semibold">6.3. AR/VR</h5>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                Procesamiento gráfico intensivo: reto en consumo de batería y
                calor.
              </li>
              <li>
                Fusión de datos del mundo real (SLAM): reto en latencia y
                precisión.
              </li>
              <li>
                Almacenamiento/transmisión de contenido 3D: estrategias de
                caching y streaming.
              </li>
              <li>Cloud rendering: requiere baja latencia (5G ideal).</li>
            </ul>
          </section>
        </div>
      ),
    },

    {
      id: "conclusion",
      title: "Conclusión",
      content: (
        <div>
          <p className="mb-2">
            La elección de la arquitectura móvil es una decisión estratégica que
            impacta a largo plazo el éxito de una aplicación. No existe una
            solución única; la decisión debe basarse en el tamaño del proyecto,
            la complejidad, la experiencia del equipo, y los requisitos de
            escalabilidad e integraciones (IA, IoT, Cloud, etc.).
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>MVC/MVP: válidos para proyectos pequeños o legacy.</li>
            <li>MVVM/MVI: ideales para UIs modernas y complejas.</li>
            <li>
              Clean Architecture: recomendado para proyectos enterprise de larga
              duración.
            </li>
          </ul>
          <p className="mt-3">
            La tendencia es hacia arquitecturas modulares, desacopladas y
            reactivas que combinen el poder de la nube con robustez en el
            dispositivo para ofrecer experiencias fiables incluso con
            conectividad imperfecta.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <style>{animationStyles}</style>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        <BackgroundElements />

        <section className="relative min-h-screen flex flex-col">
          <LandingNavbar />
          <div className="flex-1 flex items-center justify-center px-6 py-8">
            <div className="text-center max-w-5xl mx-auto">
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

              {/* Investigación asistida con IA - Sección principal */}
              <div className="max-w-4xl mx-auto mt-6">
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <aside className="md:w-1/3 mb-4 md:mb-0">
                    <div className="sticky top-24">
                      <GlassCard>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold mb-2">
                            Investigación
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Investigación asistida con IA — resumen
                            estructurado.
                          </p>
                          <nav className="text-sm">
                            <ul className="space-y-2">
                              {sections.map((s) => (
                                <li key={s.id}>
                                  <a
                                    href={`#${s.id}`}
                                    className="hover:underline text-blue-600 dark:text-blue-400"
                                  >
                                    {s.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </div>
                      </GlassCard>
                    </div>
                  </aside>

                  <main className="md:w-2/3">
                    <div className="space-y-6">
                      {sections.map((s) => (
                        <article id={s.id} key={s.id} className="first:mt-0">
                          <GlassCard>
                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-3">
                                {s.title}
                              </h3>
                              <div className="prose dark:prose-invert text-sm md:text-base">
                                {s.content}
                              </div>
                            </div>
                          </GlassCard>
                        </article>
                      ))}
                    </div>
                  </main>
                </div>
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
