import { combineReducers } from "redux";

import userReducer from "./userReducer";
import articleReducer from "./articleReducer";

const rootReducer = combineReducers({
  userAuth: userReducer,
  article: articleReducer,
});

export default rootReducer;
