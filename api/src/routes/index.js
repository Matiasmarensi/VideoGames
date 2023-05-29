const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllvideogames = require("../controllers/getAllvideogames");
const postVideogame = require("../controllers/postvideogame");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getAllvideogames);
// router.get("/videogames/:id", getvideogame);
// router.get("/videogames/name", getvideogameByName);
router.post("/videogames", postVideogame);
// router.get("/genres", getAllGenres);

module.exports = router;
