import classes from "./MovieDetail.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MovieStoreActions } from "../store";
import { useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function addToListHandler(e) {
    setIsLoading(true);
    props.addTolist(props.movie.id);
    setIsLoading(false);
  }
  if (!props.movie.backdrop_path) {
    return <h1>Please Wait Loading!!!!</h1>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})`,
        backgroundSize: "cover",
      }}
      className={classes.movieDetailContainer}
    >
      <div className={classes.moveDetail}>
        <div className={classes.poster}>
          <img
            width="500"
            height="700"
            alt="picture Not Available"
            src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`}
          ></img>
        </div>
        <div className={classes.info}>
          <h1>{props.movie.title || props.movie.name}</h1>
          <p>{props.movie.overview}</p>

          <p style={{ fontSize: "20px" }}>
            <i className="fa fa-imdb fa-2x" style={{ color: "yellow" }}></i>{" "}
            Rating: {props.movie.vote_average}/10{" "}
            <i style={{ color: "yellow" }} className="fa fa-star"></i>
          </p>
          <h3 style={{ color: "white", textDecoration: "underline" }}>Cast</h3>
          <div className={classes.castcss}>
            {props.movie?.cast?.map((curr, i) => {
              return (
                <div key={i} className={classes.castItem}>
                  {curr?.profile_path && (
                    <>
                      <img
                        width="100"
                        height="150"
                        src={`https://image.tmdb.org/t/p/w500${curr?.profile_path}`}
                      ></img>
                      <h5>{curr?.name}</h5>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          {!props.movie.addedToList && (
            <button onClick={addToListHandler} className={classes.button}>
              {isLoading && <ClipLoader color="white" />}
              {!isLoading && (
                <>
                  <i className="fa fa-plus-circle"></i>
                  <span>Add To List</span>
                </>
              )}
            </button>
          )}
          {props.movie.addedToList && (
            <button onClick={addToListHandler} className={classes.button}>
              {isLoading && <ClipLoader color="white" />}
              {!isLoading && (
                <>
                  <i className="fa fa-check"></i>

                  <span>Added To List</span>
                </>
              )}
            </button>
          )}

          {props.movie.link && (
            <a
              target="_blank"
              href={`https://www.youtube.com/watch?v=${props.movie.link}`}
            >
              <button className={classes.watchbutton}>▶Watch Clip</button>
            </a>
          )}
          {!props.movie.link && (
            <h4 style={{ color: "white" }}>Clip Not Available</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
