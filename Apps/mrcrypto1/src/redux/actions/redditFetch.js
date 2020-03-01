export const getReddit = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_REDDIT_STARTED" });

    fetch("/media?key=reddit")
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          dispatch({
            type: "FETCHING_REDDIT_DONE",
            payload: data.data
          });
        } catch (err) {
          //not recieved
          dispatch({ type: "FETCHING_REDDIT_ERROR", payload: err });
        }
      });
  };
};
