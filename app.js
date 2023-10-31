const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

// Importation des routes pour les livres et les utilisateurs
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");

// Connexion à la base de données MongoDB
mongoose
      .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware pour gérer les autorisations Cross-Origin Resource Sharing (CORS)
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

      if (req.method === "OPTIONS") {
            return res.sendStatus(200);
      }

      next();
});

// Middleware pour traiter les requêtes au format JSON
app.use(express.json());

// Définition des routes pour les livres et les utilisateurs
app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

// Gestion des fichiers statiques (images)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
