const axios = require("axios");
const { API_KEY, URL } = process.env;
const { Genre } = require("../db");

const getGenres = async () => {
  const existingGenres = await Genre.findAll();
  if (existingGenres.length === 0) {
    const response = await axios.get(`${URL}genres?key=${API_KEY}`);
    const genres = response.data.results.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));
    await Genre.bulkCreate(genres);
    return existingGenres;
  }

  return existingGenres;
};

module.exports = getGenres;
