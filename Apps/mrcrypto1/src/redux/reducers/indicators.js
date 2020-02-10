const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  indicators: {},
  toggled: []
};

export default function indicators(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_INDICATOR_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_INDICATOR_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_INDICATOR_DONE":
      let indicators = state.indicators;
      indicators[action.name] = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        indicators
      };
    case "TOGGLE_INDICATOR":
      let toggled = state.toggled;
      let index = toggled.indexOf(action.payload);

      if (index === -1) {
        toggled.push(action.payload);
      } else {
        toggled.splice(index, 1);
      }
      return { ...state, toggled };

    default:
      return state;
  }
}
