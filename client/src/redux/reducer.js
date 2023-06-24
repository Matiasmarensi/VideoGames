import {
  GET_GAMES,
  GET_GENRES,
  GENRE_FILTER,
  SOURCE_FILTER,
  ORDER_BY_NAME,
  ORDER_BY_RANKING,
  GET_PLATFORMS,
  GET_GAMES_BY_NAME,
  PLATFORM_FILTER,
  GET_GAME_BY_ID,
  DELETE_GAME,
  POST_GAME,
} from "./actions";

const initialState = {
  videoGames: [],
  genres: [],
  filteredGames: [],
  platforms: [],
  game: [],
  // sourceFilter: "",
  platformFilter: "",
  genreFilter: "",
  selectedGenre: "All",
  selectedPlatform: "All",
  orderBy: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        videoGames: action.payload,
        filteredGames: action.payload,
      };
    case GET_GAMES_BY_NAME:
      return { ...state, filteredGames: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GENRE_FILTER:
      const genreFilter = action.payload;
      let filteredByGenre = [];

      if (genreFilter !== "All") {
        filteredByGenre = state.videoGames.filter((game) => game.genres.includes(genreFilter));
      } else {
        filteredByGenre = [...state.videoGames];
      }

      if (state.platformFilter !== "" && state.platformFilter !== "All") {
        filteredByGenre = filteredByGenre.filter((game) => game.platforms.includes(state.platformFilter));
      }

      return {
        ...state,
        filteredGames: filteredByGenre,
        genreFilter: genreFilter,
      };

    case PLATFORM_FILTER:
      const selectedPlatform = action.payload;
      let filteredByPlatform = [];

      if (selectedPlatform !== "All") {
        filteredByPlatform = state.videoGames.filter((game) => game.platforms.includes(selectedPlatform));
      } else {
        filteredByPlatform = [...state.videoGames];
      }

      if (state.genreFilter !== "" && state.genreFilter !== "All") {
        filteredByPlatform = filteredByPlatform.filter((game) => game.genres.includes(state.genreFilter));
      }

      return { ...state, filteredGames: filteredByPlatform, platformFilter: selectedPlatform };
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

      if (aux?.length < 1) {
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
    case SOURCE_FILTER:
      const created = action.payload;
      let filteredBySource = [];

      if (created === "true") {
        filteredBySource = state.videoGames.filter((game) => game.created === true);
      } else if (created === "false") {
        filteredBySource = state.videoGames.filter((game) => game.created === undefined);
      } else {
        filteredBySource = [...state.filteredGames];
      }

      return {
        ...state,
        filteredGames: filteredBySource,
      };
    case GET_GAME_BY_ID:
      return {
        ...state,
        game: action.payload,
      };

    case DELETE_GAME:
      return {
        ...state,
        filteredGames: state.videoGames.filter((game) => game.id !== action.payload),
      };
    case POST_GAME:
      return {
        ...state,
        videoGames: [...state.videoGames, action.payload],
        filteredGames: [...state.filteredGames, action.payload],
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
