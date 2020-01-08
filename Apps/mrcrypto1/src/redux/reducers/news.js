const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_NEWS_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_NEWS_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_NEWS_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        data: action.payload
      };
    default:
      return state;
  }
}
