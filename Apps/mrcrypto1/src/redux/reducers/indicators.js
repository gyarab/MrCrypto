const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  indicators: {},
  toggled: [],
  success: {}
};

export default function indicators(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_INDICATOR_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_INDICATOR_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_INDICATOR_DONE":
      //datasets
      let indicators = state.indicators;
      indicators[action.name] = action.payload;
      //percentage of success
      let success = state.success;
      success[action.name] = action.percentage;

      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        indicators,
        success
      };
    case "SET_INDICATORS":
      return { ...state, toggled: action.payload };

    default:
      return state;
  }
}
