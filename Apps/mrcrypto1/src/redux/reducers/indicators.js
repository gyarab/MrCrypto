const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  indicators: { sma: [0], wma: [0], ema: [0], tma: [0], bob: [0] },
  statistics: { sma: 0, wma: 0, ema: 0, tma: 0, bob: 0 },
  toggled: []
};

export default function indicators(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_INDICATOR_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_INDICATOR_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_INDICATOR_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        indicators: {
          ...state.indicators,
          [action.name]: action.payload
        },
        statistics: {
          ...state.statistics,
          [action.name]: action.percentage
        }
      };
    case "SET_INDICATORS":
      return { ...state, toggled: action.payload };

    default:
      return state;
  }
}
