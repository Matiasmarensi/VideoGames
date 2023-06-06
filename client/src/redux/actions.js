import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const SOURCE_FILTER = "SOURCE_FILTER";
export const GENRE_FILTER = "GENRE_FILTER";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const getGames = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/videogames");
    const games = response.data;
    dispatch({ type: GET_GAMES, payload: games });
  };
};
export const getGenres = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/genres");
    const genres = response.data.map((genre) => genre.name);
    dispatch({ type: GET_GENRES, payload: genres });
  };
};
export const setGenreFilter = (genre) => {
  return {
    type: GENRE_FILTER,
    payload: genre,
  };
};
export const orderGames = (orderBy) => {
  return {
    type: ORDER_BY_NAME,
    payload: orderBy,
  };
};
