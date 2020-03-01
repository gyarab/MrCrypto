import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { getHistorical } from "./actions/prices";
import { getIndicator } from "./actions/indicators";
import { getGoogleTrends } from "./actions/googletrends";
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
function updateCandles() {
  store.dispatch(getHistorical());
  store.dispatch(getGoogleTrends());

  store.dispatch(getIndicator("ema"));
  store.dispatch(getIndicator("sma"));
  store.dispatch(getIndicator("tma"));
  store.dispatch(getIndicator("wma"));
  store.dispatch(getIndicator("bob"));
}
function updateMedia() {
  store.dispatch(getNews());
  store.dispatch(getTwitter());
  store.dispatch(getReddit());
}
updateCandles();
updateMedia();
setInterval(() => updateCandles(), 60 * 1000);
setInterval(() => updateMedia(), 30 * 60000);

export default store;
