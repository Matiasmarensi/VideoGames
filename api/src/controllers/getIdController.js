const axios = require("axios");
const { Videogame, Genre } = require("../db");

const API_KEY = "6f9bcb5437d640988efc49c8ab757774"; // Reemplaza esto con tu API key de RAWG

const URL = "https://api.rawg.io/api/";

const getGameByID = async (id) => {
  if (isNaN(id)) {
    const game = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!game) throw Error("Game not found in Database");

    return game;
  }
  if (!isNaN(id)) {
    const gameData = await axios.get(`${URL}games/${id}?key=${API_KEY}`);
    const gameApi = {
      id,
      name: gameData.data.name,
      image: gameData.data.image,
      description: gameData.data.description,
      platforms: gameData.data.platforms.map((p) => p.platform.name),
      releaseDate: gameData.data.releaseDate,
      rating: gameData.data.rating,
      genres: gameData.data.genres.map((e) => e.name),
    };

    return gameApi;
  } else return "game not found";
};

module.exports = getGameByID;
