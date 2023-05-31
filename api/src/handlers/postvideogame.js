const postGame = require("../controllers/postGameController");
const postVideogame = async (req, res) => {
  const { id, image, name, description, platforms, releaseDate, rating } = req.body;

  console.log(id, image, name, description, platforms, releaseDate, rating);

  try {
    const postedGame = await postGame(id, image, name, description, platforms, releaseDate, rating);
    return res.status(200).json(postedGame);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postVideogame;
