const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  all: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_ALL_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_ALL_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_ALL_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        all: action.payload
      };
    default:
      return state;
  }
}
