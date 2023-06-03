const { Genre } = require("../db");
const axios = require("axios");
const { API_KEY, URL } = process.env;

const getGenders = async (req, res) => {
  try {
    const ApiGenres = await axios.get(`${URL}genres?key=${API_KEY}`);
    let apiGenresData = ApiGenres.data.results;
    apiGenresData = apiGenresData.map((e) => {
      return {
        id: e.id,
        name: e.name,
      };
    });
    await Genre.bulkCreate(apiGenresData);
    res.status(200).json({ message: "Genres are up to date" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getGenders;
