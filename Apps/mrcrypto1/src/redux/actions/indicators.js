export const select = indicator => {
  return { type: "SELECT", payload: indicator };
};
export const deselect = indicator => {
  return { type: "DESELECT", payload: indicator };
};
export const getIndicator = name => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_INDICATOR_STARTED" });

    fetch("/candles?key=" + name)
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_INDICATOR_DONE",
              payload: prepareData(json.data),
              name
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_INDICATOR_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_INDICATOR_ERROR", payload: err });
      });
  };
};
//data will be restructed
function prepareData(data) {
  var result = [];
  data.forEach(a => {
    result.push({ date: a[0], close: a[1] });
  });
  return result;
}
