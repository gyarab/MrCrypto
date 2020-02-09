const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  intervals: {},
  selected: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_PRICES_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_PRICES_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_PRICES_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        intervals: action.payload,
        selected: action.payload.day
      };
    case "SELECT":
      switch (action.payload) {
        case "hour":
          return { ...state, selected: state.intervals.hour };
        case "day":
          return { ...state, selected: state.intervals.day };
        case "month":
          return { ...state, selected: state.intervals.month };
        case "all":
          return { ...state, selected: state.intervals.all };
        default:
          return { ...state };
      }
    default:
      return state;
  }
}
