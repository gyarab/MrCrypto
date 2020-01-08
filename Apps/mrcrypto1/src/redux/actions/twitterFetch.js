export const getTwitter = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_TWITTER_STARTED" });

    fetch("/media?key=twitter")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_TWITTER_DONE",
              payload: json.data
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_TWITTER_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_TWITTER_ERROR", payload: err });
      });
  };
};
