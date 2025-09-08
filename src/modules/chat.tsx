import DefaultLayout from "@layout/default";
import { baseURL } from "@context/EnvContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { io, Socket } from "socket.io-client";
import { LineRequest } from "types/lineInterfaces";
import { useAuthStore } from "auth/authStore";
import { useEffect, useRef, useState } from "react";
import { useLinesAPI } from "@api/endpoints/lines.api";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Tooltip,
  Textarea,
  Skeleton,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { writingTips } from "@styles/inspirationalQuotes";

interface Line {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  author?: {
    name: string;
    email: string;
  };
}

export default function ChatPage() {
  const location = useLocation();
  const { user, token } = useAuthStore();
  const { getLines, sendLine } = useLinesAPI();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [lines, setLines] = useState<Line[]>([]);
  const [newLine, setNewLine] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [likedLines, setLikedLines] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storyId = location.state?.storyId || useParams().storyId;
  const socketRef = useRef<Socket | null>(null);

  // Cambiar tip cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % writingTips.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Socket.IO setup
  useEffect(() => {
    if (!storyId) return;

    const socket = io(baseURL, {
      withCredentials: true,
      query: { userId: user?.id },
    });

    socketRef.current = socket;

    socket.emit("join-story", storyId);

    socket.on("new-line", (line) => {
      setLines((prev) => [...prev, line]);
    });

    socket.on("user-typing", (userId) => {
      if (userId !== user?.id) setIsTyping(true);
    });

    socket.on("user-stop-typing", () => {
      setIsTyping(false);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users.filter((id: string) => id !== user?.id));
    });

    return () => {
      socket.disconnect();
    };
  }, [storyId, user?.id]);

  useEffect(() => {
    if (!socketRef.current) return;
    if (newLine) {
      socketRef.current.emit("typing", storyId, user?.id);
    } else {
      socketRef.current.emit("stop-typing", storyId, user?.id);
    }
  }, [newLine]);

  useEffect(() => {
    if (!storyId || !token) return;

    const fetchLines = async () => {
      try {
        const response = await getLines(storyId);
        setLines(response.data);
      } catch (err) {
        addToast({
          title: "Error de conexión",
          description: "No se pudo recuperar la información de la historia",
          color: "danger",
        });
      }
    };

    fetchLines();
  }, [storyId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLine.trim() || !user?.id || !token) return;

    setIsLoading(true);
    try {
      const lineRequest: LineRequest = {
        story_id: storyId,
        author_id: user.id,
        content: newLine,
      };

      await sendLine(storyId, lineRequest);

      setNewLine("");
    } catch (err) {
      let errorMsg = "Error al enviar tu fragmento";
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response === "object" &&
        (err as any).response !== null &&
        "data" in (err as any).response &&
        typeof (err as any).response.data === "object" &&
        (err as any).response.data !== null &&
        "error" in (err as any).response.data
      ) {
        errorMsg = (err as any).response.data.error;
      }
      addToast({
        title: "Error al enviar tu fragmento",
        description: errorMsg,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeLine = (lineId: string) => {
    const newLiked = new Set(likedLines);
    if (newLiked.has(lineId)) {
      newLiked.delete(lineId);
    } else {
      newLiked.add(lineId);
    }
    setLikedLines(newLiked);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const generateFullStory = () => {
    return lines.map((line) => line.content).join(" ");
  };

  if (!storyId) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <Card className="max-w-md">
            <CardBody className="text-center py-8">
              <Icon
                icon="heroicons:book-open-20-solid"
                width="20"
                height="20"
              />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Historia no seleccionada
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Por favor selecciona una historia para comenzar a escribir
              </p>
            </CardBody>
          </Card>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Card className="mb-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2">
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white pb-2">
                      Historia
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Icon
                          icon="heroicons:pencil-solid"
                          width="16"
                          height="16"
                        />
                        {lines.length}{" "}
                        {lines.length === 1 ? "contribución" : "contribuciones"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon
                          icon="heroicons:user-group-16-solid"
                          width="16"
                          height="16"
                        />
                        {onlineUsers.length + 1} escritor
                        {onlineUsers.length !== 0 ? "es" : ""} activo
                        {onlineUsers.length !== 0 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onPress={onOpen}
                    size="sm"
                    variant="flat"
                    color="primary"
                    startContent={
                      <Icon
                        icon="heroicons:eye-16-solid"
                        width="16"
                        height="16"
                      />
                    }
                  >
                    Ver historia completa
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat principal */}
            <div className="lg:col-span-3">
              <Card className="h-[70vh] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
                <CardBody className="p-0 flex flex-col h-full">
                  {/* Mensajes */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {lines.length === 0 ? (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon
                            icon="heroicons:pencil-solid"
                            width="24"
                            height="24"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          La historia comienza contigo
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          Sé el primero en escribir y dar vida a esta aventura
                        </p>
                      </div>
                    ) : (
                      <>
                        {lines.map((line, index) => {
                          const isOwn = line.authorId === user?.id;
                          const isFirst = index === 0;
                          return (
                            <div key={line.id} className="group">
                              <div
                                className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                              >
                                <Avatar
                                  size="sm"
                                  name={line.author?.name || "Anónimo"}
                                  className={`${isOwn ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-green-400 to-blue-500"} text-white`}
                                />

                                <div
                                  className={`flex-1 max-w-lg ${isOwn ? "text-right" : "text-left"}`}
                                >
                                  <div
                                    className={`inline-block p-4 rounded-2xl shadow-sm relative ${
                                      isOwn
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm"
                                        : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-sm border border-slate-200 dark:border-slate-600"
                                    } ${isFirst ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}`}
                                  >
                                    <p className="text-sm leading-relaxed">
                                      {line.content}
                                    </p>

                                    <div
                                      className={`flex items-center gap-2 mt-2 text-xs opacity-70 ${isOwn ? "justify-end" : "justify-start"}`}
                                    >
                                      <span>
                                        {line.author?.name || "Anónimo"}
                                      </span>
                                      <span>•</span>
                                      <span>{getTimeAgo(line.createdAt)}</span>
                                    </div>
                                  </div>

                                  {/* Botones de interacción */}
                                  <div
                                    className={`flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${isOwn ? "justify-end" : "justify-start"}`}
                                  >
                                    <Tooltip content="Me gusta esta contribución">
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        color={
                                          likedLines.has(line.id)
                                            ? "danger"
                                            : "default"
                                        }
                                        onPress={() => handleLikeLine(line.id)}
                                      >
                                        {likedLines.has(line.id) ? (
                                          <Icon
                                            icon="heroicons:heart-20-solid"
                                            width="20"
                                            height="20"
                                          />
                                        ) : (
                                          <Icon
                                            icon="heroicons:heart"
                                            width="24"
                                            height="24"
                                          />
                                        )}
                                      </Button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {isTyping && (
                          <div className="flex gap-3">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-sm border">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                <div
                                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                />
                                <div
                                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                />
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                Alguien está escribiendo...
                              </p>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <Divider />

                  {/* Formulario de escritura */}
                  <div className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Icon
                          icon="heroicons:heart-20-solid"
                          width="20"
                          height="20"
                        />
                        <span className="transition-all duration-500">
                          {writingTips[currentTip]}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <Textarea
                          value={newLine}
                          onChange={(e) => setNewLine(e.target.value)}
                          placeholder="Continúa la historia con tu creatividad..."
                          minRows={1}
                          maxRows={3}
                          variant="bordered"
                          classNames={{
                            input: "text-base",
                            inputWrapper:
                              "border-2 hover:border-blue-400 focus:border-blue-500",
                          }}
                          disabled={isLoading}
                        />
                        <Button
                          type="submit"
                          isIconOnly
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white min-w-12 h-12"
                          isLoading={isLoading}
                          isDisabled={!newLine.trim()}
                        >
                          {!isLoading && (
                            <Icon
                              icon="heroicons:paper-airplane-16-solid"
                              width="16"
                              height="16"
                            />
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Panel lateral */}
            <div className="space-y-4">
              {/* Escritores activos */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Icon
                      icon="heroicons:user-group-16-solid"
                      width="16"
                      height="16"
                    />
                    Escritores activos
                  </h3>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <Avatar size="sm" name={user?.name || "Tú"} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Tú
                      </span>
                    </div>

                    {onlineUsers.slice(0, 4).map((userId, index) => (
                      <div key={userId} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <Avatar size="sm" name={`Escritor ${index + 1}`} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Escritor {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Estadísticas */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-none">
                <CardHeader className="pb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Icon
                      icon="heroicons:sparkles-16-solid"
                      width="16"
                      height="16"
                    />
                    Estadísticas
                  </h3>
                </CardHeader>
                <CardBody className="pt-0 space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {lines.length}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Contribuciones
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {generateFullStory().split(" ").length}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Palabras escritas
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {Array.from(likedLines).length}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Me gusta dados
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        {/* Modal de historia completa */}
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="3xl"
          scrollBehavior="inside"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Historia completa
                  </h2>
                </ModalHeader>
                <ModalBody>
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-none">
                    <CardBody className="p-6">
                      <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                        {generateFullStory()}
                      </p>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DefaultLayout>
  );
}
