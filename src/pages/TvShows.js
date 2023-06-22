import Row from "../Components/Row";
import Poster from "../Components/Poster";
import { useSelector, useDispatch } from "react-redux";
import classes from "./TvShows.module.css";
import {
  nowPlayingTVStore,
  trendingStoreActions,
  latestTVactions,
  mostLikedTvActions,
} from "../store/index";

function TVShows() {
  const dispatch = useDispatch();
  const user = useSelector((val) => val.auth.email);
  const myListArr = useSelector((val) => val.myList.myList);
  const tvArr = useSelector((val) => val.tvShowArr.tvArr);
  const populartvArr = useSelector((val) => val.latestTv.tvArr);
  const trendingtvArr = useSelector((val) => val.trendingTv.tvArr);
  const mostLikedtvArr = useSelector((val) => val.mostLikedTv.tvArr);

  if (!tvArr) {
    return <h1>Fetching Data</h1>;
  }

  dispatch(nowPlayingTVStore.checkMyListContent(myListArr));
  dispatch(trendingStoreActions.checkMyListContent(myListArr));
  dispatch(latestTVactions.checkMyListContent(myListArr));
  dispatch(mostLikedTvActions.checkMyListContent(myListArr));

  return (
    <>
      <Poster movieArr={tvArr}></Poster>
      <h3 className={classes.rowHeading}></h3>
      <Row moviesArr={tvArr} title={"Now Playing Tv Shows"}></Row>
      <Row moviesArr={populartvArr} title={"Popular Tv Shows"}></Row>
      <Row moviesArr={trendingtvArr} title={"Trending Tv Shows"}></Row>
      <Row moviesArr={mostLikedtvArr} title={"Most Liked Tv Shows"}></Row>
    </>
  );
}

export default TVShows;
