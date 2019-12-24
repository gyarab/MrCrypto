import { combineReducers } from "redux";

import prices from "./prices";
import news from "./news";
import twitter from "./twitter";
import toggling from "./toggling";

const rootReducer = combineReducers({
  prices,
  news,
  twitter,
  toggling
});

export default rootReducer;
