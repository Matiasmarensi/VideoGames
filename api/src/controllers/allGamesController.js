const axios = require("axios");
const { Videogame, Genre, Consola } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

const URL = "https://api.rawg.io/api/";
const RESULTS_PER_PAGE = 50;
const MAX_RESULTS = 200;

const getAllvideogames = async (query) => {
  let dataBaseVideogames = [];
  let apiVideogames = [];

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

    const apiResponse = await axios.get(
      `${URL}games?key=${API_KEY}&search=${lowerCaseQuery}&page_size=${RESULTS_PER_PAGE}`
    );
    apiVideogames = apiResponse.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      description: game.description,
      platforms: game.platforms.map((platform) => platform.platform.name),
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    }));

    if (dataBaseVideogames.length === 0 && apiVideogames.length === 0) {
      return null;
    }
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

    let currentPage = 1;
    let totalResults = 0;

    while (totalResults < MAX_RESULTS) {
      const apiResponse = await axios.get(
        `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
      );

      if (apiResponse.data.results.length === 0) {
        break;
      }

      apiVideogames = apiVideogames.concat(
        apiResponse.data.results.map((game) => ({
          id: game.id,
          name: game.name,
          image: game.background_image,
          description: game.description,
          platforms: game.platforms.map((platform) => platform.platform.name),
          releaseDate: game.released,
          rating: game.rating,
          genres: game.genres.map((genre) => genre.name),
        }))
      );

      totalResults += apiResponse.data.results.length;
      currentPage++;
    }
  }

  const allGames = [...dataBaseVideogames, ...apiVideogames];
  return allGames;
};

module.exports = getAllvideogames;
