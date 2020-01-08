const initialState = {
  news: false,
  twitter: false,
  reddit: false
};

export default function toggling(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NEWS":
      return { ...state, news: !state.news };
    case "TOGGLE_TWITTER":
      return { ...state, twitter: !state.twitter };
    case "TOGGLE_REDDIT":
      return { ...state, reddit: !state.reddit };
    default:
      return state;
  }
}
