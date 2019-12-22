const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  historical: []
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
        historical: action.payload
      };
    default:
      return state;
  }
}
