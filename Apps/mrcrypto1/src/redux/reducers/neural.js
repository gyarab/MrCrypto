const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data: [],
  percentage: null
};

export default function prices(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_NEURAL_STARTED":
      return { ...state, fetching: true };
    case "FETCHING_NEURAL_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "FETCHING_NEURAL_DONE":
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        data: action.data,
        percentage: action.percentage
      };
    default:
      return state;
  }
}
