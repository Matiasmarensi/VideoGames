const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (image, name, description, releaseDate, rating, genres, platforms) => {
  const existingGame = await Videogame.findOne({
    where: {
      name: {
        [Op.iLike]: name,
      },
    },
  });

  if (existingGame) {
    throw new Error("El nombre del juego ya existe.");
  }
  const newGame = await Videogame.create({
    image,
    name,
    description,
    releaseDate,
    rating,
    platforms,
  });
  if (!name || !description || !releaseDate || !rating || !genres || !platforms) {
    throw new Error("Todos los campos son requeridos.");
  }

  // const releaseDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  // if (!releaseDateRegex.test(releaseDate)) {
  //   throw new Error("El formato de la fecha de lanzamiento debe ser 'DD/MM/YYYY'.");
  // }

  await newGame.addConsolas(platforms);
  await newGame.addGenres(genres);

  return newGame;
};

module.exports = postGame;
