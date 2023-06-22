const getAllvideogames = require("../controllers/allGamesController");

const getAllGames = async (req, res) => {
  const { name } = req.query;
  try {
    const allGames = name ? await getAllvideogames(name) : await getAllvideogames();
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllGames;
