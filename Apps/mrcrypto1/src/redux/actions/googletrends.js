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
  var all = reformate(data.all, true);
  var month = reformate(data.month);
  var day = reformate(data.day);
  var hour = reformate(data.hour);

  let result = { all, month, day, hour };
  return result;
}

function reformate(data, align = false) {
  let newData = [];
  data.forEach(a => {
    let date = parseInt(a.time);
    newData.push({ date, ratio: a.value[0] });
  });
  return newData;
}
