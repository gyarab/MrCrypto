import { combineReducers } from "redux";

import prices from "./prices";
import neural from "./neural";
import googletrends from "./googletrends";
import indicators from "./indicators";
import news from "./news";
import twitter from "./twitter";
import reddit from "./reddit";
import toggling from "./toggling";

const rootReducer = combineReducers({
  prices,
  neural,
  googletrends,
  indicators,
  news,
  twitter,
  reddit,
  toggling
});

export default rootReducer;
