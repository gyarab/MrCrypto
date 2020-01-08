export const getHistorical = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_ALL_STARTED" });

    fetch("/candles?key=day")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_ALL_DONE",
              payload: prepareData(json.data)
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_ALL_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_ALL_ERROR", payload: err });
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
