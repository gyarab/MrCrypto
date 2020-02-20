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
  var all = reformate(data.all);
  var month = reformate(data.month);
  var day = reformate(data.day);
  var hour = reformate(data.hour);

  let result = { all, month, day, hour };
  return result;
}
function reformate(data) {
  let newData = [];
  data.forEach(a => {
    newData.push({ date: a[0], close: a[4] });
  });
  return newData;
}
