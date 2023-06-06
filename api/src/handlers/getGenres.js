const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY, URL } = process.env;
const getAllGenres = require("../controllers/genreController");

const getGenrers = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getGenrers;
