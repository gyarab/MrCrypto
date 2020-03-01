export const getNeural = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_NEURAL_STARTED" });

    fetch("/candles?key=neural")
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          dispatch({
            type: "FETCHING_NEURAL_DONE",
            data: data.data,
            percentage: data.percentage
          });
        } catch (err) {
          //not recieved
          dispatch({ type: "FETCHING_NEURAL_ERROR", payload: err });
        }
      });
  };
};
