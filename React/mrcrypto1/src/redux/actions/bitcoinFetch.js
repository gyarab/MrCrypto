export const getHistorical = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_STARTED" });

    fetch("/histBit")
      .then(res => {
        res.json().then(json => {
          dispatch({ type: "FETCHING_DONE", payload: prepareData(json) });
        });
      })
      .catch(err => {
        dispatch({ type: "FETCHING_ERROR" });
      });
  };
};

//data will be restructed and reducated 7-times
function prepareData(data) {
  var result = [];

  var c = 0;
  for (var i in data["bpi"]) {
    if (c % 7 === 0) {
      result.push({ date: i, price: data[i] });
    }
    c++;
  }
  return result;
}
