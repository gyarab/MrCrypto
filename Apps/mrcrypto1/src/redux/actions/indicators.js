export const setActive = indicators => {
  return { type: "SET_INDICATORS", payload: indicators };
};
export const getIndicator = name => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_INDICATOR_STARTED" });

    fetch("/candles?key=" + name)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          dispatch({
            type: "FETCHING_INDICATOR_DONE",
            payload: prepareData(data),
            percentage: getPercentage(data.all),
            name
          });
        } catch (err) {
          //not recieved
          dispatch({ type: "FETCHING_INDICATOR_ERROR", payload: err });
        }
      });
  };
};

function getPercentage(data) {
  //it's a double line indicator
  if (data.length === 3) return data[2];
  //single-line in
  else return data.pop()[3];
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
  let isDouble = data.length === 3 ? true : false;

  let line0 = reformateLine(isDouble ? data[0] : data);
  let line1 = isDouble ? reformateLine(data[1]) : null;
  return isDouble ? [line0, line1] : line0;
}

function reformateLine(data) {
  let newData = [];
  data.forEach(a => {
    newData.push({ date: a[0], close: a[1] });
  });
  return newData;
}
