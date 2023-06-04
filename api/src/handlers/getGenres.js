const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY, URL } = process.env;
const getAllGenres = require("../controllers/genreController");

const getGenders = async (req, res) => {
  try {
    await getAllGenres();
    res.status(200).json({ message: "Genres are up to date" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getGenders;
