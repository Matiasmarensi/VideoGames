const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
// Reemplaza esto con tu API key de RAWG

const URL = "https://api.rawg.io/api/";
//de la bdd
const getAllvideogames = async (query) => {
  let dataBaseVideogames = [];
  let apiVideogames = [];

  dataBaseVideogames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //cambio el array de objetos de los genre por array solo con los valores, sin "name"
  dataBaseVideogames = dataBaseVideogames.map((game) => ({
    ...game.toJSON(),
    genres: game.genres.map((genre) => genre.name),
  }));
  //de la api
  const ApiVideogames = await axios.get(`${URL}games?key=${API_KEY}&page_size=10`);
  apiVideogames = ApiVideogames.data.results.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    description: game.description,
    platforms: game.platforms.map((platform) => platform.platform.name),
    releaseDate: game.released,
    rating: game.rating,
    genres: game.genres.map((genre) => genre.name),
  }));
  //chekeo que no este vacio
  if (dataBaseVideogames.length === 0 && apiVideogames.length === 0) {
    throw new Error(`No se encontró ningún videojuego con el nombre "${query}".`);
  }
  //combino ambos y solo muestro 15
  const allGames = [...dataBaseVideogames, ...apiVideogames].slice(0, 15);
  if (query) {
    const filterGames = allGames.filter((game) => game.name.toLowerCase().includes(lowerCaseQuery));
    return filterGames;
  }

  return allGames;
};

module.exports = getAllvideogames;
