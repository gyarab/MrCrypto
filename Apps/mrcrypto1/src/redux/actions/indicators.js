export const setActive = indicators => {
  return { type: "SET_INDICATORS", payload: indicators };
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
              percentage: getPercentage(json),
              name
            });
            getPercentage(json);
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

function getPercentage(data) {
  let percentage = data.all.pop()[3];
  return percentage;
}

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
    newData.push({ date: a[0], close: a[1] });
  });
  return newData;
}
