import { combineReducers } from "redux";

import prices from "./prices";
import news from "./news";
import twitter from "./twitter";
import reddit from "./reddit";
import toggling from "./toggling";

const rootReducer = combineReducers({
  prices,
  news,
  twitter,
  reddit,
  toggling
});

export default rootReducer;
