const initialState = {
  news: false,
  twitter: false,
  reddit: false
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NEWS":
      return { ...state, openedNews: !state.news };
    case "TOGGLE_TWITTER":
      return { ...state, openedTwitter: !state.twitter };
    case "TOGGLE_REDDIT":
      return { ...state, openedReddit: !state.teddit };
    default:
      return state;
  }
}
