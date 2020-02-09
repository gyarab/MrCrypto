import { combineReducers } from "redux";

import prices from "./prices";
import indicators from "./indicators";
import news from "./news";
import twitter from "./twitter";
import reddit from "./reddit";
import toggling from "./toggling";

const rootReducer = combineReducers({
  prices,
  indicators,
  news,
  twitter,
  reddit,
  toggling
});

export default rootReducer;
