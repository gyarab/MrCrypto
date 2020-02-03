export function selectRange(range) {
  return { type: "SELECT", payload: range };
}
export const getHistorical = interval => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_STARTED" });

    fetch("/candles?key=" + interval)
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_DONE",
              payload: prepareData(json.data),
              interval
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_ERROR", payload: err });
      });
  };
};

//data will be restructed and reducated 7-times
function prepareData(data) {
  var result = [];
  data.forEach(a => {
    result.push({ date: a[0], close: a[1] });
  });
  return result;
}
