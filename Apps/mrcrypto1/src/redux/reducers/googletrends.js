const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  intervals: { all: [], month: [], day: [], hour: [] }
};

export default function googletrends(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_TRENDS_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_TRENDS_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_TRENDS_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        intervals: action.payload
      };
    default:
      return state;
  }
}
