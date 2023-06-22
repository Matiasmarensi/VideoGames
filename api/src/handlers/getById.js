const getGameByID = require("../controllers/getIdController");

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const gameById = await getGameByID(id);
    console.log(gameById);
    if (gameById) {
      return res.status(200).json(gameById);
    } else {
      res.status(404).send({ message: "Game not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = getById;
