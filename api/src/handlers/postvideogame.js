const { Videogame, Genre } = require("../db");
const postGame = require("../controllers/postGameController");

const postVideogame = async (req, res) => {
  const { image, name, description, releaseDate, rating, genres, platforms } = req.body;

  try {
    if (!name || !description || !releaseDate || !rating) {
      return res.status(400).json({ error: "Missing data" });
    }
    const postedGame = await postGame(image, name, description, releaseDate, rating, genres, platforms);

    return res.status(201).json(postedGame);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = postVideogame;
