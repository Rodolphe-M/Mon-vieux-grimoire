const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res, next) => {
      // Hasher le mot de passe avec bcrypt
      bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                  // Créer un nouvel utilisateur avec l'e-mail et le mot de passe hashé
                  const user = new User({
                        email: req.body.email,
                        password: hash,
                  });
                  // Sauvegarder l'utilisateur dans la base de données
                  user.save()
                        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                        .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
      // Recherche de l'utilisateur dans la base de données en fonction de l'e-mail
      User.findOne({ email: req.body.email })
            .then((user) => {
                  if (!user) {
                        // Si l'utilisateur n'est pas trouvé, renvoie une réponse avec un statut 401 (Non autorisé)
                        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
                  }
                  // Comparaison du mot de passe fourni avec le mot de passe hashé stocké
                  bcrypt.compare(req.body.password, user.password)
                        .then((valid) => {
                              if (!valid) {
                                    // Si les mots de passe ne correspondent pas, renvoie une réponse avec un statut 401 (Non autorisé)
                                    return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
                              }
                              // Si les mots de passe correspondent, génère un token JWT et renvoie une réponse avec l'identifiant de l'utilisateur et le token
                              res.status(200).json({
                                    userId: user._id,
                                    token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
                              });
                        })
                        .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
};
