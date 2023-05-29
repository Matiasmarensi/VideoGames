const { Videogame } = require("../db");

const postVideogame = async (req, res) => {
  const { id, image, name, description, platforms, releaseDate, rating } = req.body;
  console.log("post", id);
  console.log(id, image, name, description, platforms, releaseDate);

  try {
    await Videogame.findOrCreate({
      where: { id, image, name, description, platforms, releaseDate, rating },
    });
    const games = await Videogame.findAll();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogame;
