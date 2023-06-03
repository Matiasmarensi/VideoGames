const { Videogame, Genre } = require("../db");
const postGame = require("../controllers/postGameController");

const postVideogame = async (req, res) => {
  const { image, name, description, platforms, releaseDate, rating, genres } = req.body;

  try {
    const postedGame = await postGame(image, name, description, platforms, releaseDate, rating, genres);

    return res.status(200).json(postedGame);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogame;
