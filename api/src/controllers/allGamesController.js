const axios = require("axios");
const { Videogame, Genre } = require("../db");

const API_KEY = "6f9bcb5437d640988efc49c8ab757774"; // Reemplaza esto con tu API key de RAWG

const URL = "https://api.rawg.io/api/";

const getAllvideogames = async () => {
  const dataBaseVideogames = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const ApiVideogames = await axios.get(`${URL}games?key=${API_KEY}&page_size=10`);
  const gamesData = ApiVideogames.data.results;

  const allgames = gamesData.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.background_image,
    description: game.description,
    platforms: game.platforms.map((platform) => platform.platform.name),
    releaseDate: game.released,
    rating: game.rating,
    genres: game.genres.map((genre) => genre.name),
  }));

  return [...dataBaseVideogames, ...allgames];
};

module.exports = getAllvideogames;
