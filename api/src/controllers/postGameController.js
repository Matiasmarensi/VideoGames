const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");

const postGame = async (id, image, name, description, platforms, releaseDate, rating, genreName) => {
  const [newGame, created] = await Videogame.findOrCreate({
    where: { id, image, name, description, platforms, releaseDate, rating },
  });

  const foundGenre = await Genre.findOne({ where: { name: genreName } });
  console.log(newGame);

  if (foundGenre) {
    await newGame.addGenre(foundGenre);

    newGame.dataValues.genre = genreName;
  } else {
    console.log("El género no se encontró en la base de datos.");
  }

  return newGame;
};

module.exports = postGame;
