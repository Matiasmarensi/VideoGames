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

// export const CREATED_BY_ME_FILTER = "CREATED_BY_ME_FILTER";
export const getGames = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    const games = response.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};
export const getGamesByQuery = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
    const games = response.data;

    if (!Array.isArray(games) || games === null) {
      getGames();
    }

    dispatch({ type: GET_GAMES_BY_NAME, payload: games });
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/genres");
    const genres = response.data.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

    dispatch({ type: GET_GENRES, payload: genres });
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
    const response = await axios.get(`http://localhost:3001/videogames/${id}`);
    const game = response.data;
    console.log(game);
    dispatch({ type: GET_GAME_BY_ID, payload: game });
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/platforms");
    const platforms = response.data.map((platform) => ({
      id: platform.id,
      name: platform.name,
    }));

    dispatch({ type: GET_PLATFORMS, payload: platforms });
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
//Botones/Opciones para filtrar por género, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
export const sourceFilter = (filterValue) => {
  return {
    type: SOURCE_FILTER,
    payload: filterValue,
  };
};
export const deleteGame = (id) => {
  return async function (dispatch) {
    await axios.delete(`http://localhost:3001/videogames/${id}`);

    return dispatch({ type: DELETE_GAME, payload: id });
  };
};

export const createVideogame = (newVideogame) => {
  return (dispatch) => {
    axios.post("http://localhost:3001/videogames", newVideogame).then((res) => {
      alert("Videojuego creado");
      dispatch({ type: POST_GAME, payload: newVideogame });
    });
  };
};

// export const filterByCreatedByMe = (filterValue) => ({
//   type: CREATED_BY_ME_FILTER,
//   payload: filterValue,
// });
