export const getNews = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_NEWS_STARTED" });

    fetch("/media?key=news")
      .then(res => {
        res
          .json()
          .then(json => {
            dispatch({
              type: "FETCHING_NEWS_DONE",
              payload: json.data
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
