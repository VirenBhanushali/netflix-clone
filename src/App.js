import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { useDispatch } from "react-redux";
import { mostLikedActions, MovieStoreActions } from "./store";
import MyList from "./pages/MyList";
import { latestMoviesActions, trendingMovieActions } from "./store";
import MovieDetails from "./pages/MovieDetails";
import { useSelector } from "react-redux";
import { myListActions } from "./store/index";
import LoginPage from "./pages/LoginPage";
import {
  nowPlayingTVStore,
  trendingStoreActions,
  latestTVactions,
  mostLikedTvActions,
} from "./store/index";
import TVShows from "./pages/TvShows";
import SearchList from "./Components/SearchList";

//API KEY =  54fb24f80c20e73d4dd89bb74d63d800
//LINK https://api.themoviedb.org/3/movie/550?api_key=54fb24f80c20e73d4dd89bb74d63d800

//ACCESS TOKEN = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGZiMjRmODBjMjBlNzNkNGRkODliYjc0ZDYzZDgwMCIsInN1YiI6IjYxM2I2MDc3YzY4YjY5MDA0NGE4MmJjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a_puAQdBQaHx0wFgJh2s7m0ckm4dc5xGSVEGFm1Fq9s
const API_KEY = "?api_key=54fb24f80c20e73d4dd89bb74d63d800";
function App() {
  const isLoggedIn = useSelector((val) => val.auth.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  const nowPlayingmovies = useSelector((val) => val.movieArr.movieArr);
  const latestMoviesArr = useSelector((val) => val.latestMovies.movieArr);
  const trendingMovieArr = useSelector((val) => val.trendingMovies.movieArr);
  const mostLikedMovieArr = useSelector((val) => val.mostLiked.movieArr);
  const tvArr = useSelector((val) => val.tvShowArr.tvArr);
  const populartvArr = useSelector((val) => val.latestTv.tvArr);
  const trendingtvArr = useSelector((val) => val.trendingTv.tvArr);
  const mostLikedtvArr = useSelector((val) => val.mostLikedTv.tvArr);
  //Fetching Now Playing
  const [isAddedToListUpdated, chandAddedToList] = useState(false);
  const myList = useSelector((val) => val.myList.myList);
  const user = useSelector((val) => val.auth.email);

  useEffect(async () => {
    console.log(user);
    const response = await fetch(
      `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`
    );
    const data = await response.json();
    const results = data;
    dispatch(myListActions.updateMovies(results));
    chandAddedToList(true);
  }, [user, isLoggedIn]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing" + API_KEY
    );
    const data = await response.json();

    // console.log(data);
    const results = data.results.map((curr) => {
      return { ...curr, addedToList: false };
    });
    // console.log(results);
    dispatch(MovieStoreActions.updateMovies({ results }));
  }, [myList, isLoggedIn]);

  //Fetching Popular
  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/75624/similar" + API_KEY
    );
    const data = await response.json();

    // console.log(data);
    const results = data.results.map((curr) => {
      return { ...curr, addedToList: false };
    });
    // console.log(results);
    dispatch(latestMoviesActions.updateMovies({ results }));
  }, [myList, isLoggedIn]);
  //Fetching Top Rated
  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated" + API_KEY
    );
    const data = await response.json();

    const results = data.results.map((curr) => {
      return { ...curr, addedToList: false };
    });
    dispatch(trendingMovieActions.updateMovies({ results }));
  }, [myList, isLoggedIn]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/635302/similar" + API_KEY
    );
    const data = await response.json();

    const results = data.results.map((curr) => {
      return { ...curr, addedToList: false };
    });

    dispatch(mostLikedActions.updateMovies({ results }));
  }, [myList, isLoggedIn]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/on_the_air?api_key=54fb24f80c20e73d4dd89bb74d63d800"
    );

    const data = await response.json();

    const results = data.results.map((curr) => {
      return {
        ...curr,
        addedToList: false,
      };
    });
    dispatch(nowPlayingTVStore.updateTV({ results }));
  }, [myList, isLoggedIn]);
  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=54fb24f80c20e73d4dd89bb74d63d800"
    );

    const data = await response.json();

    const results = data.results.map((curr) => {
      return {
        ...curr,
        addedToList: false,
      };
    });
    dispatch(latestTVactions.updateTV({ results }));
  }, [myList, isLoggedIn]);
  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=54fb24f80c20e73d4dd89bb74d63d800"
    );

    const data = await response.json();

    const results = data.results.map((curr) => {
      return {
        ...curr,
        addedToList: false,
      };
    });
    dispatch(trendingStoreActions.updateTV({ results }));
  }, [myList, isLoggedIn]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/61663/similar?api_key=54fb24f80c20e73d4dd89bb74d63d800"
    );

    const data = await response.json();

    const results = data.results.map((curr) => {
      return {
        ...curr,
        addedToList: false,
      };
    });
    dispatch(mostLikedTvActions.updateTV({ results }));
  }, [myList, isLoggedIn]);
  const [searchMovies, setSearchMovies] = useState([]);
  function searchMethod(searchItem) {
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

    const filteredMovies = movies.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
    });
    for (let i = 0; i < filteredMovies.length; i++) {
      for (let j = i + 1; j < filteredMovies.length; j++) {
        if (filteredMovies[i].id === filteredMovies[j].id) {
          filteredMovies.splice(i, 1);
        }
      }
    }
    const updatedFilteredMovies = filteredMovies.filter(
      (val) =>
        val?.title?.includes(`${searchItem}`) ||
        val?.name?.includes(`${searchItem}`)
    );
    console.log(updatedFilteredMovies);
    setSearchMovies(updatedFilteredMovies);
  }

  function closeSearchContainer() {
    setSearchMovies([]);
  }

  return (
    <>
      {searchMovies.length > 0 && (
        <SearchList
          closeSearchContainer={closeSearchContainer}
          SearchList={searchMovies}
        ></SearchList>
      )}
      {isLoggedIn && <Navbar searchMethod={searchMethod}></Navbar>}

      <Switch>
        {!isLoggedIn && (
          <Route exact path="/">
            <LoginPage></LoginPage>
          </Route>
        )}

        {isLoggedIn ? (
          <>
            <Redirect to="/home"></Redirect>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/tvshows">
              <TVShows></TVShows>
            </Route>
            <Route exact path="/my-list">
              <MyList></MyList>
            </Route>
            <Route exact path="/details/:movieId/:type">
              <MovieDetails></MovieDetails>
            </Route>
          </>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Switch>
      <footer className="footer">
        <h3>CopyRight React is Cool</h3>
      </footer>
    </>
  );
}

export default App;
