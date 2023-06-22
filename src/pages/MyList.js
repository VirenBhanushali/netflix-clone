import { useSelector } from "react-redux";
import { latestMoviesActions, mostLikedActions } from "../store";
import Row from "../Components/Row";
import { useEffect, useState } from "react";

function MyList() {
  const myList = useSelector((val) => val.myList.myList);
  if (!myList) return;
  const movies = [...myList];

  const filteredMovies = movies
    .filter((movie) => movie.addedToList === true)
    .sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
    });

  for (let i = 0; i < filteredMovies.length; i++) {
    for (let j = i + 1; j < filteredMovies.length; j++) {
      if (filteredMovies[i].id === filteredMovies[j].id) {
        filteredMovies.splice(j, 1);
      }
    }
  }

  return (
    <>
      <div className="myList-Container">
        <Row
          className="myList"
          moviesArr={filteredMovies}
          title={"My List"}
          MyList={filteredMovies}
        ></Row>
      </div>
    </>
  );
}

export default MyList;
