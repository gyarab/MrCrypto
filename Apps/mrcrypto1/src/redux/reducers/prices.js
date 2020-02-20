const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  currency: "$",
  intervals: { all: [0], month: [0], day: [0], hour: [0] },
  selected: "day"
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
        intervals: action.payload
      };
    case "SELECT":
      return { ...state, selected: action.payload };

    default:
      return state;
  }
}
