import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ClipLoader from "react-spinners/ClipLoader";
import {
  mostLikedActions,
  MovieStoreActions,
  trendingMovieActions,
  nowPlayingTVStore,
  trendingStoreActions,
  latestTVactions,
  mostLikedTvActions,
  removeFromList,
  myListActions,
} from "../store";
import { latestMoviesActions } from "../store";
import classes from "./Row.module.css";
import { Link, useHistory } from "react-router-dom";

function Row(props) {
  const [isLoading, setIsLoading] = useState(false);
  const moviesArr = props.moviesArr;
  const user = useSelector((val) => val.auth.email);
  const myList = useSelector((val) => val.myList.myList);
  const [hover, changeHover] = useState(false);
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAddedToListUpdated, chandAddedToList] = useState(false);
  useEffect(() => {
    chandAddedToList(true);
  }, [myList]);

  // console.log(moviesArr);
  let actions;
  if (props.title === "Now Playing") {
    actions = MovieStoreActions;
  }
  if (props.title === "Popular Movies") {
    actions = latestMoviesActions;
  }
  if (props.title === "Trending Movies") {
    actions = trendingMovieActions;
  }
  if (props.title === "Most Liked") {
    actions = mostLikedActions;
  }
  if (props.title === "Now Playing Tv Shows") {
    actions = nowPlayingTVStore;
  }
  if (props.title === "Popular Tv Shows") {
    actions = latestTVactions;
  }
  if (props.title === "Trending Tv Shows") {
    actions = trendingStoreActions;
  }
  if (props.title === "Most Liked Tv Shows") {
    actions = mostLikedTvActions;
  }

  const rowRef = useRef();

  function leftButtonHandler() {
    rowRef.current.scrollLeft += -250;
  }

  function rightButtonHandler() {
    rowRef.current.scrollLeft += 250;
  }

  if (!moviesArr) {
    return <h1>Fetching Data</h1>;
  }
  let overview;
  let movieOrTv;

  return (
    <>
      <div style={{ position: "relative" }}>
        <h3 style={{ color: "white" }}>{props.title}</h3>

        <div
          className={classes.rowContainer}
          style={{ overflowX: "scroll" }}
          ref={rowRef}
        >
          {moviesArr.map((curr) => {
            return (
              <div
                key={curr.id}
                onMouseEnter={() => {
                  setId(curr.id);
                  chandAddedToList(false);
                  changeHover(true);
                }}
                onMouseLeave={() => {
                  setId(0);
                  chandAddedToList(false);
                  changeHover(true);
                }}
                className={classes.moviePoster}
              >
                <Link
                  key={curr.id}
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/details/${curr.id}/${curr?.title ? "movie" : "tv"}`}
                >
                  <img
                    className={classes.posterImages}
                    src={`https://image.tmdb.org/t/p/w500${curr.poster_path}`}
                  ></img>
                  {(overview = curr.overview.slice(0, 80))}
                  {hover && id === curr.id && (
                    <div className={classes.intro}>
                      <h3>{curr.title || curr.name}</h3>
                      <p>{overview}...read more</p>
                      {isLoading && <ClipLoader color="white" />}
                      {!props.MyList?.length > 0 && !isLoading && (
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            dispatch(
                              actions.addToListID({
                                id: curr.id,
                                user: user,
                                myList: myList,
                                moviesArr: moviesArr,
                              })
                            );
                            // dispatch(actions.removeFromListID(curr.id));

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
                          }}
                        >
                          {curr.addedToList ? (
                            <i className="fa fa-check fa-2x"></i>
                          ) : (
                            <i className="fa fa-plus-circle"></i>
                          )}
                          {curr.addedToList ? (
                            <span>Added To List</span>
                          ) : (
                            <span>Add To List</span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
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
    </>
  );
}
export default Row;
