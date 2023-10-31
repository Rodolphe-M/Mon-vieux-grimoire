const mongoose = require("mongoose");

// Définition du schéma pour les livres
const bookSchema = mongoose.Schema({
      userId: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      imageUrl: { type: String, required: true },
      year: { type: Number, required: true },
      genre: { type: String, required: true },
      ratings: [
            {
                  userId: { type: String, required: true },
                  grade: { type: Number, required: true, min: 0, max: 5 },
            },
      ],
      averageRating: { type: Number, default: 0 },
});

// Exportation du modèle basé sur le schéma
module.exports = mongoose.model("Book", bookSchema);
