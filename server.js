const http = require("http");
const app = require("./app");

// Fonction pour normaliser le port
const normalizePort = (val) => {
      const port = parseInt(val, 10);

      if (isNaN(port)) {
            return val;
      }
      if (port >= 0) {
            return port;
      }
      return false;
};

// Détermine le port à utiliser
const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);

// Gestionnaire d'erreur pour le serveur
const errorHandler = (error) => {
      if (error.syscall !== "listen") {
            throw error;
      }
      const address = server.address();
      const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
      switch (error.code) {
            case "EACCES":
                  console.error(bind + " nécessite des privilèges élevés.");
                  process.exit(1);
                  break;
            case "EADDRINUSE":
                  console.error(bind + " est déjà en cours d'utilisation.");
                  process.exit(1);
                  break;
            default:
                  throw error;
      }
};

// Création du serveur avec l'application
const server = http.createServer(app);

// Gestion des erreurs et affichage des informations de connexion
server.on("error", errorHandler);
server.on("listening", () => {
      const address = server.address();
      const bind = typeof address === "string" ? "pipe " + address : "port " + port;
      console.log("Écoute sur " + bind);
});

// Démarre le serveur pour écouter sur le port défini
server.listen(port);
