import { combineReducers } from "redux";

import prices from "./prices";
import news from "./news";
import toggling from "./toggling";

const rootReducer = combineReducers({
  prices,
  news,
  toggling
});

export default rootReducer;
