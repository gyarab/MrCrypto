import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { getHistorical, selectRange } from "./actions/prices";
import { getNews } from "./actions/newsFetch";
import { getTwitter } from "./actions/twitterFetch";
import { getReddit } from "./actions/redditFetch";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//initialize candles
store.dispatch(getHistorical("all"));
store.dispatch(getHistorical("month"));
store.dispatch(getHistorical("day"));
store.dispatch(getHistorical("hour"));

store.dispatch(selectRange("day")); //default

//initialize media
store.dispatch(getNews());
store.dispatch(getTwitter());
store.dispatch(getReddit());

export default store;
