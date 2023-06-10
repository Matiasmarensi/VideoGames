const axios = require("axios");
const { Videogame, Genre, Consola } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");
// Reemplaza esto con tu API key de RAWG

const URL = "https://api.rawg.io/api/";

const getAllvideogames = async (query) => {
  let dataBaseVideogames = [];
  let apiVideogames = [];
  //si viene query busca en bdd
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    dataBaseVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCaseQuery}%`,
        },
      },
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Consola,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    dataBaseVideogames = dataBaseVideogames.map((game) => ({
      ...game.toJSON(),
      genres: game.genres.map((genre) => genre.name),
      platforms: game.consolas.map((platform) => platform.name),
    }));

    //y busca en api
    const ApiVideogames = await axios.get(`${URL}games?key=${API_KEY}&page_size=22&search=${lowerCaseQuery}`);
    apiVideogames = ApiVideogames.data.results
      .map((game) => ({
        id: game.id,
        name: game.name,
        image: game.background_image,
        description: game.description,
        platforms: game.platforms.map((platform) => platform.platform.name),
        releaseDate: game.released,
        rating: game.rating,
        genres: game.genres.map((genre) => genre.name),
      }))
      .slice(0, 15);

    if (dataBaseVideogames.length === 0 && apiVideogames.length === 0) {
      throw new Error(`No se encontró ningún videojuego con el nombre "${query}".`);
    }
    //busca en bdd
  } else {
    dataBaseVideogames = await Videogame.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Consola,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    dataBaseVideogames = dataBaseVideogames.map((game) => ({
      ...game.toJSON(),
      genres: game.genres.map((genre) => genre.name),
      platforms: game.consolas.map((platforms) => platforms.name),
    }));
    ///en api
    const ApiVideogames = await axios.get(`${URL}games?key=${API_KEY}&page_size=22`);
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
  }

  //justa resulados
  const allGames = [...dataBaseVideogames, ...apiVideogames].slice(0, 15);
  return allGames;
};

module.exports = getAllvideogames;
