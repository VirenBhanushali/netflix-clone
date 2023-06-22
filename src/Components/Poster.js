import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Poster.module.css";
import { MovieStoreActions, nowPlayingTVStore, myListActions } from "../store";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function Poster(props) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((val) => val.auth.email);
  const myList = useSelector((val) => val.myList.myList);
  const [index, changeIndex] = useState(0);
  const [isAddedToListUpdated, chandAddedToList] = useState(false);
  const movieArr = [...props.movieArr.slice(0, 4)];
  const dispatch = useDispatch();
  const history = useHistory();

  function leftButtonHandler() {
    chandAddedToList(false);
    if (index === 0) {
      changeIndex(movieArr.length - 1);
    } else {
      changeIndex((prevIndex) => prevIndex - 1);
    }
  }
  function rightButtonHandler() {
    chandAddedToList(false);
    if (index === movieArr.length - 1) {
      changeIndex(0);
    } else {
      changeIndex((prevIndex) => prevIndex + 1);
    }
  }

  function addToListHandler() {
    if (movieArr[index]?.title) {
      setIsLoading(true);
      dispatch(
        MovieStoreActions.addToListID({
          id: movieArr[index].id,
          user: user,
          myList: myList,
          moviesArr: movieArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        chandAddedToList(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(true);
      dispatch(
        nowPlayingTVStore.addToListID({
          id: movieArr[index].id,
          user: user,
          myList: myList,
          moviesArr: movieArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        chandAddedToList(true);
        setIsLoading(false);
      }, 1000);
    }
  }

  return (
    <div
      className={classes.poster}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieArr[index]?.backdrop_path})`,
      }}
    >
      <div className={classes.info}>
        <div className={classes?.title}>
          <h1>{movieArr[index]?.title || movieArr[index]?.name}</h1>
          <div className={classes?.overview}>
            <h3>{movieArr[index]?.overview}</h3>
          </div>
          <div className={classes.addToList}>
            {isLoading && <ClipLoader color="white" />}
            {!isLoading && (
              <button onClick={addToListHandler}>
                {!movieArr[index]?.addedToList ? (
                  <i className="fa fa-plus-circle fa-2x"></i>
                ) : (
                  <i className="fa fa-check fa-2x"></i>
                )}
                {movieArr[index]?.addedToList && <span>Added To List</span>}
                {!movieArr[index]?.addedToList && <span>Add To List</span>}
              </button>
            )}
          </div>
        </div>
      </div>
      <button onClick={leftButtonHandler} className={classes.leftButton}>
        <p>
          <i className={`${classes.arrow} ${classes.left}`}></i>
        </p>
      </button>
      <button onClick={rightButtonHandler} className={classes.rightButton}>
        <p>
          <i className={`${classes.arrow} ${classes.right}`}></i>
        </p>
      </button>
    </div>
  );
}
export default Poster;
