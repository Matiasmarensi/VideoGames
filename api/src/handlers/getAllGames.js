const allGamesController = require("../controllers/allGamesController");

const getAllGames = async (req, res) => {
  try {
    const allGames = await allGamesController();
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllGames;
