import { combineReducers } from "redux";

import prices from "./prices";
import news from "./news";
import twitter from "./twitter";
import reddit from "./reddit";
import toggling from "./toggling";
import ranges from "./ranges";

const rootReducer = combineReducers({
  prices,
  news,
  twitter,
  reddit,
  toggling,
  ranges
});

export default rootReducer;
