export const getNews = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_NEWS_STARTED" });

    fetch("/news")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_NEWS_DONE",
              payload: json
            });
          })
          //error after recieving
          .catch(err => {
            dispatch({ type: "FETCHING_NEWS_ERROR", payload: err });
          });
      })
      //not recieved
      .catch(err => {
        dispatch({ type: "FETCHING_NEWS_ERROR", payload: err });
      });
  };
};
