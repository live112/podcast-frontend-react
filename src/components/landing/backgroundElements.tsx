export const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Líneas decorativas */}
    <div className="absolute top-1/4 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-blue-400/30 dark:via-blue-500/20 to-transparent rotate-45 animate-pulse"></div>
    <div
      className="absolute top-1/3 right-1/4 w-80 h-px bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-500/20 to-transparent -rotate-45 animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-1/3 left-1/3 w-72 h-px bg-gradient-to-r from-transparent via-cyan-400/30 dark:via-cyan-500/20 to-transparent rotate-12 animate-pulse"
      style={{ animationDelay: "2s" }}
    ></div>

    {/* Orbes flotantes */}
    <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-500/15 dark:to-cyan-500/15 rounded-full blur-xl animate-float"></div>
    <div
      className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 dark:from-purple-500/15 dark:to-pink-500/15 rounded-full blur-lg animate-float"
      style={{ animationDelay: "2s" }}
    ></div>
    <div
      className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 dark:from-cyan-500/10 dark:to-blue-500/10 rounded-full blur-2xl animate-float"
      style={{ animationDelay: "4s" }}
    ></div>
    <div
      className="absolute bottom-40 right-32 w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 dark:from-indigo-500/15 dark:to-purple-500/15 rounded-full blur-xl animate-float"
      style={{ animationDelay: "6s" }}
    ></div>
  </div>
);
