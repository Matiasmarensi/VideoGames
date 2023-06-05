import { GET_GAMES } from "./actions";

const initialState = {
  videoGames: [],
  genres: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, videoGames: action.payload };

    default:
      return { ...state };
  }
};
export default rootReducer;
