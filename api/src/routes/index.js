const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllGames = require("../handlers/getAllGames");
const postVideogame = require("../handlers/postvideogame");
const getById = require("../handlers/getById");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getAllGames);
router.get("/videogames/:id", getById);
// router.get("/videogames/name", getvideogameByName);
router.post("/videogames", postVideogame);
// router.get("/genres", getAllGenres);

module.exports = router;
