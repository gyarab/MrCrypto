export function selectRange(range) {
  return { type: "SELECT", payload: range };
}
export const getHistorical = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_PRICES_STARTED" });

    fetch("/candles?key=prices")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_PRICES_DONE",
              payload: prepareData(json)
            });
          })
          //error after recieving
          .catch(err => {
            console.log("error: " + err);
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
  var all = [];
  var month = [];
  var day = [];
  var hour = [];

  data.all.forEach(a => {
    all.push({ date: a[0], close: a[4] });
  });
  data.month.forEach(a => {
    month.push({ date: a[0], close: a[4] });
  });
  data.day.forEach(a => {
    day.push({ date: a[0], close: a[4] });
  });
  data.hour.forEach(a => {
    hour.push({ date: a[0], close: a[4] });
  });

  let result = { all, month, day, hour };
  return result;
}
