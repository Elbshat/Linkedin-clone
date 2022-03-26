import { SET_LOADING_STATUS, SET_ARTICLES } from "../actions/actionType";
const initialState = {
  loading: false,
  articles: [],
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return { ...state, loading: action.payload };
    case SET_ARTICLES:
      return { ...state, articles: action.payload };
    default:
      return state;
  }
};

export default articleReducer;
