import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const SOURCE_FILTER = "SOURCE_FILTER";
export const GENRE_FILTER = "GENRE_FILTER";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RANKING = "ORDER_BY_RATING";

// export const CREATED_BY_ME_FILTER = "CREATED_BY_ME_FILTER";
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
    const genres = response.data.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));
    console.log(genres);
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
// export const filterByCreatedByMe = (filterValue) => ({
//   type: CREATED_BY_ME_FILTER,
//   payload: filterValue,
// });
