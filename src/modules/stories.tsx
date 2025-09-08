import { useStoriesAPI } from "@api/endpoints/chat.api";
import DefaultLayout from "@layout/default";
import { useAuthStore } from "auth/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Skeleton,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { storyCardVariants } from "@styles/storyCardVariants";
import { inspirationalQuotes } from "@styles/inspirationalQuotes";

interface Story {
  id: string;
  title: string;
  createdAt: string;
}

export default function StoriesPage() {
  const navigate = useNavigate();
  const { token, user } = useAuthStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { createStory, getStories } = useStoriesAPI();

  const [title, setTitle] = useState<string>("");
  const [stories, setStories] = useState<Story[]>([]);
  const [message, setMessage] = useState<string>("");
  const [firstLine, setFirstLine] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (token) fetchStories();
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStories = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await getStories();
      const data = await response.data;

      setStories(data.data || []);
    } catch (error: any) {
      setMessage(error.message || "Error al cargar historias");

      if (error.message?.includes("401")) navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await createStory({
        title,
        creator_id: user.id,
        first_line: firstLine,
      });

      setMessage("Historia creada exitosamente");
      setTitle("");

      await fetchStories();
      onOpenChange();
    } catch (error: any) {
      setMessage(error?.response?.data?.error || "Error al crear historia");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToChat = (storyId: string) => {
    navigate("/chat", {
      state: {
        storyId,
        fromStories: true,
      },
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Hace menos de 1 hora";
    if (diffInHours < 24)
      return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
  };

  const getUserGreeting = () => {
    const hour = new Date().getHours();
    const userName = user?.name || user?.email?.split("@")[0] || "Escritor";

    if (hour < 12) return `Buenos días, ${userName}`;
    if (hour < 18) return `Buenas tardes, ${userName}`;
    return `Buenas noches, ${userName}`;
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen ">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {getUserGreeting()}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    ¿Listo para escribir algo extraordinario hoy?
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <Card className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-none shadow-xl">
              <CardBody className="text-center py-8">
                <div className="transition-all duration-1000 ease-in-out">
                  <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 mb-3 italic">
                    "{inspirationalQuotes[currentQuote].quote}"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    — {inspirationalQuotes[currentQuote].author}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onPress={onOpen}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              startContent={
                <Icon icon="heroicons:plus-16-solid" width="16" height="16" />
              }
            >
              Crear nueva historia
            </Button>
            {/* <Button
              size="lg"
              variant="bordered"
              className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              startContent={
                <Icon
                  icon="heroicons:book-open-16-solid"
                  width="16"
                  height="16"
                />
              }
            >
              Explorar comunidad
            </Button> */}
          </div>

          {/* Stories Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Historias
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {stories.length}{" "}
                  {stories.length === 1
                    ? "historia creada"
                    : "historias creadas"}
                </p>
              </div>
              <Chip
                size="lg"
                variant="flat"
                color="success"
                startContent={
                  <Icon
                    icon="heroicons:sparkles-16-solid"
                    width="16"
                    height="16"
                  />
                }
              >
                {stories.length} Activas
              </Chip>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-64">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 rounded-lg" />
                    </CardHeader>
                    <CardBody>
                      <Skeleton className="h-4 w-full rounded-lg mb-2" />
                      <Skeleton className="h-4 w-2/3 rounded-lg" />
                    </CardBody>
                    <CardFooter>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : stories.length === 0 ? (
              <Card className="py-12">
                <CardBody className="text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                      <Icon
                        icon="heroicons:pencil-solid"
                        width="24"
                        height="24"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                      Tu primera historia te espera
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md">
                      Cada gran escritor comenzó con una página en blanco. ¿Cuál
                      será tu primera historia?
                    </p>
                    <Button
                      onPress={onOpen}
                      color="primary"
                      size="lg"
                      startContent={
                        <Icon
                          icon="heroicons:plus-16-solid"
                          width="16"
                          height="16"
                        />
                      }
                    >
                      Comenzar a escribir
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, index) => {
                  const variant =
                    storyCardVariants[index % storyCardVariants.length];
                  return (
                    <Card
                      key={story.id}
                      className="group hover:scale-105 transition-all duration-300 cursor-pointer border-none shadow-lg hover:shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                      isPressable
                      onPress={() => navigateToChat(story.id)}
                    >
                      <CardHeader className="relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
                        ></div>
                        <div className="relative flex items-start justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${variant.gradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
                            >
                              {variant.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                {story.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardBody className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-1 pt-2">
                            <Icon
                              icon="heroicons:clock-16-solid"
                              width="16"
                              height="16"
                            />
                            <span>{getTimeAgo(story.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                          <Chip
                            size="sm"
                            variant="flat"
                            color={variant.color as any}
                          >
                            En progreso
                          </Chip>
                        </div>
                      </CardBody>

                      <CardFooter className="pt-0 bg-gradient-to-r ${variant.gradient} text-white font-medium group-hover:shadow-lg transition-all duration-300">
                        Continuar escribiendo
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats Section */}
          {stories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-none">
                <CardBody className="text-center">
                  <Icon icon="heroicons:star-16-solid" width="16" height="16" />
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stories.length}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Historias creadas
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none">
                <CardBody className="text-center">
                  <Icon icon="heroicons:pencil-solid" width="24" height="24" />
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    ∞
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Palabras por escribir
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-none">
                <CardBody className="text-center">
                  <Icon
                    icon="heroicons:sparkles-16-solid"
                    width="16"
                    height="16"
                  />
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    100%
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Creatividad
                  </p>
                </CardBody>
              </Card>
            </div>
          )}
        </div>

        {/* Create Story Modal */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Crear nueva historia
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                    Dale vida a tus ideas con una historia única
                  </p>
                </ModalHeader>
                <form onSubmit={handleCreateStory}>
                  <ModalBody>
                    <div className="space-y-4">
                      <Input
                        label="Título de la historia"
                        placeholder="Escribe un título cautivador..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="bordered"
                        size="lg"
                        isRequired
                        isDisabled={isLoading}
                        startContent={
                          <Icon
                            icon="heroicons:sparkles-16-solid"
                            width="16"
                            height="16"
                          />
                        }
                      />

                      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-none">
                        <CardBody>
                          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                            💡 <strong>Consejo:</strong> Un buen título
                            despierta la curiosidad. Piensa en algo que te haría
                            querer leer más...
                          </p>
                        </CardBody>
                      </Card>

                      <Input
                        label="Primera línea"
                        placeholder="Comienza la historia con una frase o un tema..."
                        value={firstLine}
                        onChange={(e) => setFirstLine(e.target.value)}
                        variant="bordered"
                        size="lg"
                        isRequired
                        isDisabled={isLoading}
                        startContent={
                          <Icon
                            icon="heroicons:pencil-solid"
                            width="16"
                            height="16"
                          />
                        }
                      />

                      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-none">
                        <CardBody>
                          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                            💡 <strong>Consejo:</strong> La primera línea
                            siempre atrapa al lector.
                          </p>
                        </CardBody>
                      </Card>
                    </div>

                    {message && (
                      <div
                        className={`p-4 rounded-lg ${
                          message.includes("exitosamente")
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      isDisabled={isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      isLoading={isLoading}
                      startContent={
                        !isLoading ? (
                          <Icon
                            icon="heroicons:plus-16-solid"
                            width="16"
                            height="16"
                          />
                        ) : null
                      }
                    >
                      {isLoading ? "Creando..." : "Crear"}
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DefaultLayout>
  );
}
