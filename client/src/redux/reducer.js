import { GET_GAMES, GET_GENRES, GENRE_FILTER, SOURCE_FILTER, ORDER_BY_NAME } from "./actions";

const initialState = {
  videoGames: [],
  genres: [],

  genreFilter: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, videoGames: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    case GENRE_FILTER:
      return { ...state, genreFilter: action.payload };
    case ORDER_BY_NAME:
      const { videoGames } = state;
      const sorted = [...videoGames].sort((a, b) => {
        if (action.payload === "Ascendente") {
          return a.name.localeCompare(b.name); // Orden ascendente
        } else {
          return b.name.localeCompare(a.name); // Orden descendente
        }
      });
      return {
        ...state,
        videoGames: sorted,
        orderBy: action.payload,
      };
    case SOURCE_FILTER:
      return {
        ...state,
        sourceFilter: action.payload,
      };

    default:
      return { ...state };
  }
};
export default rootReducer;
