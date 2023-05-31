const { Videogame } = require("../db");

const postGame = async (id, image, name, description, platforms, releaseDate, rating) => {
  await Videogame.findOrCreate({
    where: { id, image, name, description, platforms, releaseDate, rating },
  });
  const games = await Videogame.findAll();
  return games;
};

module.exports = postGame;
