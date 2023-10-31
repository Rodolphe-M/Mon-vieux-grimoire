const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
      try {
            // Récupération du token depuis l'en-tête Authorization
            const token = req.headers.authorization.split(" ")[1];

            // Décodage du token pour récupérer les informations
            const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

            // Extraction de l'identifiant de l'utilisateur du token
            const userId = decodedToken.userId;

            // Ajout de l'identifiant de l'utilisateur à la requête (req.auth)
            req.auth = {
                  userId: userId,
            };

            // Passage à la prochaine étape du middleware
            next();
      } catch (error) {
            // En cas d'erreur lors de la vérification du token
            res.status(401).json({ error });
      }
};
