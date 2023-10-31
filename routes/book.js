const express = require("express");
const router = express.Router();

// Middleware d'authentification
const auth = require("../middleware/auth");
// Middleware pour le traitement des fichiers
const { upload, imageOptimization } = require("../middleware/multer-config");

// Contrôleur pour les livres, gestion des opérations CRUD ( Create, Read, Update, Delete)
const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getAllBooks);
router.post("/", auth, upload, imageOptimization, bookCtrl.createBook);
router.get("/bestrating", bookCtrl.bestRating);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, upload, imageOptimization, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.addRating);

module.exports = router;
