import Navbar from "../Components/Navbar";
import Poster from "../Components/Poster";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Row from "../Components/Row";
import { configureStore } from "@reduxjs/toolkit";
import classes from "../Components/Row.module.css";
import {
  MovieStoreActions,
  latestMoviesActions,
  trendingMovieActions,
  mostLikedActions,
} from "../store/index";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((val) => val.auth.email);
  const myList = useSelector((val) => val.myList.myList);
  const moviesArr = useSelector((val) => val.movieArr.movieArr);
  const latestMoviesArr = useSelector((val) => val.latestMovies.movieArr);
  const trendingMovieArr = useSelector((val) => val.trendingMovies.movieArr);
  const mostLikedMovieArr = useSelector((val) => val.mostLiked.movieArr);
  const isLoggedIn = useSelector((val) => val.auth.isLoggedIn);

  useEffect(() => {
    dispatch(MovieStoreActions.checkMyListContent(myList));
    dispatch(latestMoviesActions.checkMyListContent(myList));
    dispatch(trendingMovieActions.checkMyListContent(myList));
    dispatch(mostLikedActions.checkMyListContent(myList));
  });

  return (
    <>
      <Poster movieArr={moviesArr}></Poster>
      <h3 className={classes.rowHeading}></h3>
      <Row moviesArr={moviesArr} title={"Now Playing"}></Row>
      <Row moviesArr={latestMoviesArr} title={"Popular Movies"}></Row>
      <Row moviesArr={trendingMovieArr} title={"Trending Movies"}></Row>
      <Row moviesArr={mostLikedMovieArr} title={"Most Liked"}></Row>
    </>
  );
}

export default Home;
