const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Définition du schéma pour les utilisateurs
const userSchema = mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
});

// Utilisation du plugin uniqueValidator pour le champ "email"
userSchema.plugin(uniqueValidator);

// Exportation du modèle basé sur le schéma
module.exports = mongoose.model("User", userSchema);
