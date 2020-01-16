const initialState = {
  selected: "day"
};

export default function ranges(state = initialState, action) {
  switch (action.type) {
    case "SELECT_RANGE":
      return {
        selected: action.payload
      };
    default:
      return state;
  }
}
