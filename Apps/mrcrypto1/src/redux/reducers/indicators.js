const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  sma: {},
  ema: {},
  selected: []
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
        selected: state.sma.day, //just for testing.. later will be removed with selecting functionality
        [action.name]: action.payload
      };
    default:
      return state;
  }
}
