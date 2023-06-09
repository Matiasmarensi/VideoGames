import {
  GET_GAMES,
  GET_GENRES,
  GENRE_FILTER,
  SOURCE_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_RANKING,
  CREATED_BY_ME_FILTER,
  GET_PLATFORMS,
  PLATFORM_FILTER,
} from "./actions";

const initialState = {
  videoGames: [],
  genres: [],
  filteredGames: [],
  genreFilter: "",
  platforms: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, videoGames: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GENRE_FILTER:
      const selectedGenre = action.payload;
      let filtered = [];

      if (selectedGenre !== "All") {
        filtered = state.videoGames.filter((game) => game.genres.some((genre) => genre === selectedGenre));
      }
      return { ...state, filteredGames: filtered };

    case ORDER_BY_RANKING:
      const isAscending = action.payload === "Ascendente";
      const sortedGamesByRating = [...state.filteredGames].sort((a, b) => {
        if (isAscending) {
          return a.rating - b.rating; // Orden ascendente
        } else {
          return b.rating - a.rating; // Orden descendente
        }
      });

      return {
        ...state,
        filteredGames: sortedGamesByRating,
        orderBy: action.payload,
      };

    case ORDER_BY_NAME:
      let aux = state.filteredGames;

      if (aux.length < 1) {
        aux = state.videoGames;
      }
      const sorted = aux.sort((a, b) => {
        if (action.payload === "Ascendente") {
          return a.name.localeCompare(b.name); // Orden ascendente
        } else {
          return b.name.localeCompare(a.name); // Orden descendente
        }
      });
      return {
        ...state,
        filteredGames: sorted,
        orderBy: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case PLATFORM_FILTER:
      const selectedPlatform = action.payload;
      let filteredByPlatform = [];

      if (selectedPlatform !== "All") {
        filteredByPlatform = state.videoGames.filter(
          (game) => game.platforms && game.platforms.some((platform) => platform === selectedPlatform)
        );
      }
      return {
        ...state,
        filteredGames: filteredByPlatform,
      };

    case SOURCE_FILTER:
      return {
        ...state,
        videoGames: action.payload,
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
// const genres = action.payload;
// if (genres === "All") {
//   return {
//     ...state,
//     filteredGames: state.videoGames,
//   };
// } else {
//   const filtered = state.videoGames.filter((game) => game.genres.includes(genres));
//   console.log(filtered);

//   return {
//     ...state,
//     filteredGames: filtered,
//   };
// }
