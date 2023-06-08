const getAllPlatforms = require("../controllers/getPlatformsController");

const getPlatforms = async (req, res) => {
  try {
    const plataformas = await getAllPlatforms();
    res.status(200).json(plataformas);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getPlatforms;
