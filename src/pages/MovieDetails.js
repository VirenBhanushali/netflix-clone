import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieDetail from "../Components/MovieDetail";
import { useEffect } from "react";
import { useState } from "react";
import {
  latestMoviesActions,
  mostLikedActions,
  MovieStoreActions,
  trendingMovieActions,
  nowPlayingTVStore,
  trendingStoreActions,
  latestTVactions,
  mostLikedTvActions,
  myListActions,
} from "../store";

// video Link url = "https://api.themoviedb.org/3/movie/482373/videos?api_key=54fb24f80c20e73d4dd89bb74d63d800"

function MovieDetails() {
  const params = useParams();
  const nowPlayingmovies = useSelector((val) => val.movieArr.movieArr);
  const dispatch = useDispatch();
  const latestMoviesArr = useSelector((val) => val.latestMovies.movieArr);
  const trendingMovieArr = useSelector((val) => val.trendingMovies.movieArr);
  const mostLikedMovieArr = useSelector((val) => val.mostLiked.movieArr);
  const tvArr = useSelector((val) => val.tvShowArr.tvArr);
  const populartvArr = useSelector((val) => val.latestTv.tvArr);
  const trendingtvArr = useSelector((val) => val.trendingTv.tvArr);
  const mostLikedtvArr = useSelector((val) => val.mostLikedTv.tvArr);
  const user = useSelector((val) => val.auth.email);
  const myList = useSelector((val) => val.myList.myList);
  const movieId = Number(params.movieId);
  const type = params.type;
  const [render, plsRender] = useState(false);

  const movies = [
    ...nowPlayingmovies,
    ...latestMoviesArr,
    ...trendingMovieArr,
    ...mostLikedMovieArr,
    ...tvArr,
    ...populartvArr,
    ...trendingtvArr,
    ...mostLikedtvArr,
  ];

  dispatch(MovieStoreActions.checkMyListContent(myList));
  dispatch(latestMoviesActions.checkMyListContent(myList));
  dispatch(trendingMovieActions.checkMyListContent(myList));
  dispatch(mostLikedActions.checkMyListContent(myList));
  dispatch(nowPlayingTVStore.checkMyListContent(myList));
  dispatch(trendingStoreActions.checkMyListContent(myList));
  dispatch(latestTVactions.checkMyListContent(myList));
  dispatch(mostLikedTvActions.checkMyListContent(myList));

  const filteredMovies = movies.sort((a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
  });
  let count = 0;
  let index = 0;

  for (let i = 0; i < filteredMovies.length; i++) {
    for (let j = i + 1; j < filteredMovies.length; j++) {
      if (filteredMovies[i].id === filteredMovies[j].id) {
        filteredMovies.splice(i, 1);
      }
    }
  }
  let oldMovieObj;
  oldMovieObj = filteredMovies.find((curr) => curr.id === movieId);

  const [data, setData] = useState({});

  useEffect(async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}?api_key=54fb24f80c20e73d4dd89bb74d63d800`
    );
    const data = await response.json();

    const response2 = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=54fb24f80c20e73d4dd89bb74d63d800`
    );
    const data2 = await response2.json();

    const response3 = await fetch(
      `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=54fb24f80c20e73d4dd89bb74d63d800&region=IN`
    );
    const data3 = await response3.json();

    const requiredData = {
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      title: data.title || data.name,
      id: data.id,
      overview: data.overview,
      vote_average: data.vote_average,
      cast: data2?.cast?.slice(0, 4),
      link: data3?.results[0]?.key,
      addedToList: oldMovieObj?.addedToList,
      type: type,
    };
    setData(requiredData);

    return () => {
      setData({});
    };
  }, [oldMovieObj, myList]);

  function addTolist(id) {
    const movie = nowPlayingmovies.find((curr) => curr.id === id);
    if (movie) {
      dispatch(
        MovieStoreActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: nowPlayingmovies,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
      }, 1000);
      plsRender((old) => !old);
      return;
    }

    const movie2 = trendingMovieArr.find((curr) => curr.id === id);
    if (movie2) {
      dispatch(
        trendingMovieActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: trendingMovieArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);
      return;
    }

    const movie3 = latestMoviesArr.find((curr) => curr.id === id);
    if (movie3) {
      dispatch(
        latestMoviesActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: latestMoviesArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);
      return;
    }
    const movie4 = mostLikedMovieArr.find((curr) => curr.id === id);
    if (movie4) {
      dispatch(
        mostLikedActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: mostLikedMovieArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);
      return;
    }
    const tv = tvArr.find((curr) => curr.id === id);
    if (tv) {
      dispatch(
        nowPlayingTVStore.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: tvArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
      }, 1000);
      plsRender((old) => !old);
      return;
    }
    const tv2 = populartvArr.find((curr) => curr.id === id);
    if (tv2) {
      dispatch(
        latestTVactions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: populartvArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);
      return;
    }
    const tv3 = trendingtvArr.find((curr) => curr.id === id);
    if (tv3) {
      dispatch(
        trendingStoreActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: trendingtvArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);
      return;
    }
    const tv4 = mostLikedtvArr.find((curr) => curr.id === id);
    if (tv4) {
      dispatch(
        mostLikedTvActions.addToListID({
          id: id,
          user: user,
          myList: myList,
          moviesArr: mostLikedtvArr,
        })
      );
      setTimeout(async () => {
        console.log("running now");
        const res2 = await fetch(
          `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
        );

        const data = await res2.json();

        dispatch(myListActions.updateMovies(data));
        plsRender((old) => !old);
      }, 1000);

      return;
    }
  }

  //   if (!movie) {
  //     return <h1>Fetching Data</h1>;
  //   }

  if (!data) {
    return <h1>Fetching Your Data</h1>;
  }

  return <MovieDetail addTolist={addTolist} movie={data}></MovieDetail>;
}

export default MovieDetails;
