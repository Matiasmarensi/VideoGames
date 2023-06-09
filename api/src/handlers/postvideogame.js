const { Videogame, Genre } = require("../db");
const postGame = require("../controllers/postGameController");

const postVideogame = async (req, res) => {
  const { image, name, description, releaseDate, rating, genres, platforms } = req.body;
  console.log(genres, releaseDate, platforms);
  try {
    const postedGame = await postGame(image, name, description, releaseDate, rating, genres, platforms);

    return res.status(200).json(postedGame);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = postVideogame;
