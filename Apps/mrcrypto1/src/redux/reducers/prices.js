const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  all: [],
  month: [],
  day: [],
  hour: [],
  selected: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        selected: state.day,
        [action.interval]: action.payload
      };
    case "SELECT":
      switch (action.payload) {
        case "hour":
          return { ...state, selected: state.hour };
        case "day":
          return { ...state, selected: state.day };
        case "month":
          return { ...state, selected: state.month };
        case "all":
          return { ...state, selected: state.all };
        default:
          return { ...state };
      }
    default:
      return state;
  }
}
