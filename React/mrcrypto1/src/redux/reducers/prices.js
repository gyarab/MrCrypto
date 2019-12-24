const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  historical: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_HISTORICAL_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_HISTORICAL_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_HISTORICAL_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        historical: action.payload
      };
    default:
      return state;
  }
}
