export const getTwitter = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_TWITTER_STARTED" });

    fetch("/media?key=twitter")
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          dispatch({
            type: "FETCHING_TWITTER_DONE",
            payload: data.data
          });
        } catch (err) {
          //not recieved
          dispatch({ type: "FETCHING_TWITTER_ERROR", payload: err });
        }
      });
  };
};
