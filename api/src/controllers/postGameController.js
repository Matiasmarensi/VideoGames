const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (id, image, name, description, platforms, releaseDate, rating, genres) => {
  const newGame = await Videogame.create({
    id,
    image,
    name,
    description,
    platforms,
    releaseDate,
    rating,
  });

  newGame.addGenres(genres);

  return newGame;
};

module.exports = postGame;
