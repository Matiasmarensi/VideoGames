const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (id, image, name, description, platforms, releaseDate, rating, genres) => {
  const [newGame, created] = await Videogame.findOrCreate({
    where: { id, image, name, description, platforms, releaseDate, rating },
  });

  for (const genre of genres) {
    const foundGenre = await Genre.findOne({ where: { name: genre } });

    if (foundGenre) {
      await newGame.addGenre(foundGenre);
    } else {
      console.log(`El género "${genre}" no se encontró en la base de datos.`);
    }
  }

  newGame.dataValues.genres = genres;

  return newGame;
};

module.exports = postGame;
