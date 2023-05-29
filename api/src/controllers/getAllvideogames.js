const { Videogame } = require("../db");

const getAllvideogames = async (req, res) => {
  try {
    const allgames = await Videogame.findAll({
      limit: 10,
    });

    return res.status(200).json(allgames);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllvideogames;
