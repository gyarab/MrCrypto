export function selectRange(range) {
  return { type: "SELECT", payload: range };
}
export const getHistorical = interval => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_PRICES_STARTED" });

    fetch("/candles?key=" + interval)
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_PRICES_DONE",
              payload: prepareData(json.data),
              interval
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_PRICES_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_PRICES_ERROR", payload: err });
      });
  };
};

//data will be restructed
function prepareData(data) {
  var result = [];
  data.forEach(a => {
    result.push({ date: a[0], close: a[4] });
  });
  return result;
}
