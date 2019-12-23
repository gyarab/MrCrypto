const initialState = {
  openedNews: false,
  openedTwitter: false,
  openedReddit: false
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NEWS":
      return { ...state, openedNews: !state.openedNews };
    case "TOGGLE_TWITTER":
      return { ...state, openedTwitter: !state.openedTwitter };
    case "TOGGLE_REDDIT":
      return { ...state, openedReddit: !state.openedReddit };
    default:
      return state;
  }
}
