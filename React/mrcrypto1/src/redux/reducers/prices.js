const initialState = {
  loading: true,
  error: false,
  historical: []
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_STARTED":
      return { ...state, loading: true };
    case "FETCHING_ERROR":
      return { ...state, loading: false, error: true };
    case "FETCHING_DONE":
      return {
        ...state,
        loading: false,
        error: false,
        historical: action.payload
      };
    default:
      return state;
  }
}
