const { Videogame } = require("../db");
const getAllvideogames = require("../controllers/allGamesController");
const deleteGame = async (req, res) => {
  const { id } = req.params;

  console.log("deleteFav", id);

  try {
    await Videogame.destroy({ where: { id: id } });
    const allGames = await getAllvideogames();
    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteGame;
