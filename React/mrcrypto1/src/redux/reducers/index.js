import { combineReducers } from "redux";

import prices from "./prices";
import media from "./media";

const rootReducer = combineReducers({
  prices,
  media
});

export default rootReducer;
