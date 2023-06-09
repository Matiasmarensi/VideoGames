const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (image, name, description, releaseDate, rating, genres, platforms) => {
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

  // Validar formato de la fecha de lanzamiento
  const releaseDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!releaseDateRegex.test(releaseDate)) {
    throw new Error("El formato de la fecha de lanzamiento debe ser 'YYYY-MM-DD'.");
  }

  await newGame.addConsolas(platforms);
  await newGame.addGenres(genres);

  return newGame;
};

module.exports = postGame;
