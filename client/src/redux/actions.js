import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const SOURCE_FILTER = "SOURCE_FILTER";
export const GENRE_FILTER = "GENRE_FILTER";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RANKING = "ORDER_BY_RATING";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const PLATFORM_FILTER = "PLATFORM_FILTER";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const DELETE_GAME = "DELETE_GAME";
export const POST_GAME = "POST_GAME";
export const UPDATE_GENRES = "UPDATE_GENRES";

// export const CREATED_BY_ME_FILTER = "CREATED_BY_ME_FILTER";
export const getGames = () => {
  return async function (dispatch) {
    const response = await axios.get("https://videogames-production-74c6.up.railway.app/videogames");
    const games = response.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};
export const getGamesByQuery = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`https://videogames-production-74c6.up.railway.app/videogames?name=${name}`);
    const games = response.data;

    if (!Array.isArray(games) || games === null) {
      getGames();
    }

    dispatch({ type: GET_GAMES_BY_NAME, payload: games });
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("https://videogames-production-74c6.up.railway.app/genres");

      if (Array.isArray(response.data)) {
        console.log(response.data);
        const genres = response.data?.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));

        dispatch({ type: GET_GENRES, payload: genres });
      } else {
        // Manejar la respuesta no válida de la API
        console.log(response.data);
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.log("Error al obtener los géneros:", error);
    }
  };
};
export const setGenreFilter = (genre) => {
  return {
    type: GENRE_FILTER,
    payload: genre,
  };
};
export const getGameById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`https://videogames-production-74c6.up.railway.app/videogames/${id}`);
      const game = response.data;

      if (game) {
        dispatch({ type: GET_GAME_BY_ID, payload: game });
      } else {
        // Manejar la respuesta no válida de la API
        console.log("La respuesta no es una obj:", game);
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.log("Error al obtener el juego por ID:", error);
    }
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("https://videogames-production-74c6.up.railway.app/platforms");

      if (Array.isArray(response.data)) {
        const platforms = response.data.map((platform) => ({
          id: platform.id,
          name: platform.name,
        }));

        dispatch({ type: GET_PLATFORMS, payload: platforms });
      } else {
        // Manejar la respuesta no válida de la API
        console.error("La respuesta de la API no es una matriz válida.");
      }
    } catch (error) {
      // Manejar el error de la solicitud
      console.error("Error al obtener las plataformas:", error);
    }
  };
};
export const setPlatformFilter = (platform) => {
  return {
    type: PLATFORM_FILTER,
    payload: platform,
  };
};

export const orderGames = (orderBy) => {
  return {
    type: ORDER_BY_NAME,
    payload: orderBy,
  };
};
export const orderGamesRating = (orderBy) => {
  return {
    type: ORDER_BY_RANKING,
    payload: orderBy,
  };
};

export const sourceFilter = (filterValue) => {
  return {
    type: SOURCE_FILTER,
    payload: filterValue,
  };
};
export const deleteGame = (id) => {
  return async function (dispatch) {
    await axios.delete(`https://videogames-production-74c6.up.railway.app/videogames/${id}`);
    await dispatch(getGames());
    return dispatch({ type: DELETE_GAME, payload: id });
  };
};

export const createVideogame = (newVideogame) => {
  return (dispatch) => {
    axios
      .post("https://videogames-production-74c6.up.railway.app/videogames", newVideogame)
      .then((res) => {
        alert("Videojuego creado");
        dispatch({ type: POST_GAME, payload: newVideogame });
        dispatch(getGames());
      })
      .catch((error) => {
        console.log(error.response.data.error);
        alert(error.response.data.error);
      });
  };
};

// export const updateGenres = (genres) => {
//   return {
//     type: UPDATE_GENRES,
//     payload: genres,
//   };
// };

// export const filterByCreatedByMe = (filterValue) => ({
//   type: CREATED_BY_ME_FILTER,
//   payload: filterValue,
// });
