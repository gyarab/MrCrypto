export const getNews = () => {
  return function(dispatch) {
    dispatch({ type: "FETCHING_NEWS_STARTED" });

    fetch("/media?key=news")
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          dispatch({
            type: "FETCHING_NEWS_DONE",
            payload: data.data
          });
        } catch (err) {
          //not recieved
          dispatch({ type: "FETCHING_NEWS_ERROR", payload: err });
        }
      });
  };
};
