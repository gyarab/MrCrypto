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

store.dispatch(getHistorical()); //initialize bitcoin prices
store.dispatch(getGoogleTrends()); //initialize google trends

//sma indicators
store.dispatch(getIndicator("ema"));
store.dispatch(getIndicator("sma"));
store.dispatch(getIndicator("tma"));
store.dispatch(getIndicator("wma"));
store.dispatch(getIndicator("bob"));

//initialize media
store.dispatch(getNews());
store.dispatch(getTwitter());
store.dispatch(getReddit());

export default store;
