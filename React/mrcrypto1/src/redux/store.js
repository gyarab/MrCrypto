import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { getHistorical } from "./actions/bitcoinFetch";
import { getNews } from "./actions/newsFetch";
import { getTwitter } from "./actions/twitterFetch";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//initialize
store.dispatch(getHistorical());
store.dispatch(getNews());
store.dispatch(getTwitter());

export default store;
