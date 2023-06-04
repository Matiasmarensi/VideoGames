const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY, URL } = process.env;

const getAllGenres = async () => {
  const ApiGenres = await axios.get(`${URL}genres?key=${API_KEY}`);
  let apiGenresData = ApiGenres.data.results;
  apiGenresData = apiGenresData.map((e) => {
    return {
      id: e.id,
      name: e.name,
    };
  });
  return await Genre.bulkCreate(apiGenresData);
};
module.exports = getAllGenres;
