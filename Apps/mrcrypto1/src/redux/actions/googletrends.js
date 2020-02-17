export const getGoogleTrends = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_TRENDS_STARTED" });

    fetch("/googletrends")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_TRENDS_DONE",
              payload: prepareData(json)
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_TRENDS_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_TRENDS_ERROR", payload: err });
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
    all.push({ date: parseInt(a.time), ratio: a.value[0] });
  });
  data.month.forEach(a => {
    month.push({ date: parseInt(a.time), ratio: a.value[0] });
  });
  data.day.forEach(a => {
    day.push({ date: parseInt(a.time), ratio: a.value[0] });
  });
  data.hour.forEach(a => {
    hour.push({ date: parseInt(a.time), ratio: a.value[0] });
  });

  let result = { all, month, day, hour };
  return result;
}
