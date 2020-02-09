import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { getHistorical } from "./actions/prices";
import { getIndicator } from "./actions/indicators";
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

//sma indicators
store.dispatch(getIndicator("sma_all"));
store.dispatch(getIndicator("sma_month"));
store.dispatch(getIndicator("sma_day"));
store.dispatch(getIndicator("sma_hour"));

//initialize media
store.dispatch(getNews());
store.dispatch(getTwitter());
store.dispatch(getReddit());

export default store;
