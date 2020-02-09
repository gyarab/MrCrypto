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
              payload: prepareData(json),
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
  var all = [];
  var month = [];
  var day = [];
  var hour = [];

  data.all.forEach(a => {
    all.push({ date: a[0], close: a[1] });
  });
  data.month.forEach(a => {
    month.push({ date: a[0], close: a[1] });
  });
  data.day.forEach(a => {
    day.push({ date: a[0], close: a[1] });
  });
  data.hour.forEach(a => {
    hour.push({ date: a[0], close: a[1] });
  });
  let result = { all, month, day, hour };
  return result;
}
