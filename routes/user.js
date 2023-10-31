const express = require("express");
const router = express.Router();

// Importation du contrôleur pour les utilisateurs
const userCtrl = require("../controllers/user");

// Définit 2 routes Signup et Login
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
