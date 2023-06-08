const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (image, name, description, platforms, releaseDate, rating, genres, consolas) => {
  const newGame = await Videogame.create({
    image,
    name,
    description,
    platforms,
    releaseDate,
    rating,
    consolas,
  });

  await newGame.addConsolas(consolas);
  await newGame.addGenres(genres);

  return newGame;
};

module.exports = postGame;
