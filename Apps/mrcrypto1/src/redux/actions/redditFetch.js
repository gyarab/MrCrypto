export const getReddit = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_REDDIT_STARTED" });

    fetch("/media?key=reddit")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_REDDIT_DONE",
              payload: json.data
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_REDDIT_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_REDDIT_ERROR", payload: err });
      });
  };
};
