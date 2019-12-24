const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: []
};

export default function reddit(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_REDDIT_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_REDDIT_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_REDDIT_DONE":
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
