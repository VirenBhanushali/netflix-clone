import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MyList from "../pages/MyList";

async function removeFromList(id, user, myList) {
  const myListCopy = [...myList];

  const item = myListCopy.filter((val) => val.id !== id);

  const res1 = await fetch(
    `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`,
    {
      method: "PUT",
      body: JSON.stringify(item),
    }
  );
}

async function addToListDB(id, user, myList, array) {
  console.log(myList);
  const myListCopy = [...myList];

  const item = array.find((val) => val.id === id);
  console.log(item);
  const updatedItem = { ...item, addedToList: true };
  console.log(updatedItem);
  const itemAddedArray = [...myListCopy, updatedItem];

  console.log(itemAddedArray);

  const res1 = await fetch(
    `https://netflix-demo-clone-f9cfc-default-rtdb.firebaseio.com/${user}.json`,
    {
      method: "PUT",
      body: JSON.stringify(itemAddedArray),
    }
  );
}

///--------------------------Movies----------------------------------------------------//Movies
const movieArrSlice = createSlice({
  name: "movieArray",
  initialState: {
    movieArr: [],
  },
  reducers: {
    updateMovies(state, action) {
      state.movieArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.movieArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.movieArr[i].id === action.payload[j].id) {
            state.movieArr[i].addedToList = true;
          }
        }
      }
    },
    removeFromListID(state, action) {
      state.movieArr.forEach((val) => {
        if (val.id === action.payload) {
          console.log(val.addedToList);
          val.addedToList = false;
          console.log(val.addedToList);
        }
      });
    },

    addToList(state, action) {
      if (!state.movieArr[action.payload].addedToList) {
        state.movieArr[action.payload].addedToList = true;
      } else {
        state.movieArr[action.payload].addedToList = false;
      }
    },

    addToListID(state, action) {
      state.movieArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            console.log("adding..");
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            console.log("removinnggg.....");
            console.log(state.movieArr[idx].addedToList);
            state.movieArr[idx].addedToList = false;
            console.log(state.movieArr[idx].addedToList);
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const latestMovieSlice = createSlice({
  name: "latestMovies",
  initialState: {
    movieArr: [],
  },
  reducers: {
    updateMovies(state, action) {
      // console.log(action.payload.results);
      state.movieArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.movieArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.movieArr[i].id === action.payload[j].id) {
            state.movieArr[i].addedToList = true;
          }
        }
      }
    },

    addToList(state, action) {
      if (!state.movieArr[action.payload].addedToList) {
        state.movieArr[action.payload].addedToList = true;
      } else {
        state.movieArr[action.payload].addedToList = false;
      }
    },
    addToListID(state, action) {
      state.movieArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            console.log("removinnggg.....");
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const trendinfMoviesSlice = createSlice({
  name: "trendingSlice",
  initialState: {
    movieArr: [],
  },
  reducers: {
    updateMovies(state, action) {
      state.movieArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.movieArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.movieArr[i].id === action.payload[j].id) {
            state.movieArr[i].addedToList = true;
          }
        }
      }
    },
    addToListID(state, action) {
      state.movieArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            console.log("removinnggg.....");
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const mostLikedSlice = createSlice({
  name: "mostLiked",
  initialState: {
    movieArr: [],
  },
  reducers: {
    updateMovies(state, action) {
      // console.log(action.payload.results);
      state.movieArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.movieArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.movieArr[i].id === action.payload[j].id) {
            state.movieArr[i].addedToList = true;
          }
        }
      }
    },

    addToList(state, action) {
      if (!state.movieArr[action.payload].addedToList) {
        state.movieArr[action.payload].addedToList = true;
      } else {
        state.movieArr[action.payload].addedToList = false;
      }
    },
    addToListID(state, action) {
      state.movieArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

//----------------------------------------//TV Shows//---------------------------------------------------------------------
const tvShowsArr = createSlice({
  name: "movieArray",
  initialState: {
    tvArr: [],
  },
  reducers: {
    updateTV(state, action) {
      state.tvArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.tvArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.tvArr[i].id === action.payload[j].id) {
            state.tvArr[i].addedToList = true;
          }
        }
      }
    },

    addToList(state, action) {
      if (!state.tvArr[action.payload].addedToList) {
        state.tvArr[action.payload].addedToList = true;
      } else {
        state.tvArr[action.payload].addedToList = false;
      }
    },

    addToListID(state, action) {
      state.tvArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const latestTVlice = createSlice({
  name: "latestTV",
  initialState: {
    tvArr: [],
  },
  reducers: {
    updateTV(state, action) {
      // console.log(action.payload.results);
      state.tvArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.tvArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.tvArr[i].id === action.payload[j].id) {
            state.tvArr[i].addedToList = true;
          }
        }
      }
    },

    addToList(state, action) {
      if (!state.tvArr[action.payload].addedToList) {
        state.tvArr[action.payload].addedToList = true;
      } else {
        state.tvArr[action.payload].addedToList = false;
      }
    },
    addToListID(state, action) {
      state.tvArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const trendingTVSlice = createSlice({
  name: "trendingTVSlice",
  initialState: {
    tvArr: [],
  },
  reducers: {
    updateTV(state, action) {
      state.tvArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.tvArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.tvArr[i].id === action.payload[j].id) {
            state.tvArr[i].addedToList = true;
          }
        }
      }
    },
    addToListID(state, action) {
      state.tvArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const mostLikedTVSlice = createSlice({
  name: "mostLiked",
  initialState: {
    tvArr: [],
  },
  reducers: {
    updateTV(state, action) {
      state.tvArr = action.payload.results;
    },
    checkMyListContent(state, action) {
      for (let i = 0; i < state.tvArr.length; i++) {
        for (let j = 0; j < action.payload.length; j++) {
          if (state.tvArr[i].id === action.payload[j].id) {
            state.tvArr[i].addedToList = true;
          }
        }
      }
    },

    addToList(state, action) {
      if (!state.tvArr[action.payload].addedToList) {
        state.tvArr[action.payload].addedToList = true;
      } else {
        state.tvArr[action.payload].addedToList = false;
      }
    },
    addToListID(state, action) {
      state.tvArr.forEach((curr, idx) => {
        if (curr.id === action.payload.id) {
          if (!action.payload.moviesArr[idx].addedToList) {
            addToListDB(
              action.payload.id,
              action.payload.user,
              action.payload.myList,
              action.payload.moviesArr
            );
          } else {
            removeFromList(
              action.payload.id,
              action.payload.user,
              action.payload.myList
            );
          }
        }
      });
    },
  },
});

const AuthSlice = createSlice({
  name: "auth-slice",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("token")) ? true : false,
    token: JSON.parse(localStorage.getItem("token")) || null,
    email: JSON.parse(localStorage.getItem("token"))?.user || null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.id;
      console.log(action.payload.email);
      state.email = action.payload.email;
      localStorage.setItem(
        "token",
        JSON.stringify({
          id: action.payload.id,
          user: action.payload.email,
        })
      );
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    myList: [],
  },
  reducers: {
    updateMovies(state, action) {
      state.myList = action.payload || [];
    },
  },
});

const store = configureStore({
  reducer: {
    movieArr: movieArrSlice.reducer,
    latestMovies: latestMovieSlice.reducer,
    trendingMovies: trendinfMoviesSlice.reducer,
    mostLiked: mostLikedSlice.reducer,
    tvShowArr: tvShowsArr.reducer,
    latestTv: latestTVlice.reducer,
    trendingTv: trendingTVSlice.reducer,
    mostLikedTv: mostLikedTVSlice.reducer,
    auth: AuthSlice.reducer,
    myList: myListSlice.reducer,
  },
});

const trendingMovieActions = trendinfMoviesSlice.actions;
const MovieStoreActions = movieArrSlice.actions;
const latestMoviesActions = latestMovieSlice.actions;
const mostLikedActions = mostLikedSlice.actions;
const nowPlayingTVStore = tvShowsArr.actions;
const trendingStoreActions = trendingTVSlice.actions;
const latestTVactions = latestTVlice.actions;
const mostLikedTvActions = mostLikedTVSlice.actions;
const AuthSliceActions = AuthSlice.actions;
const myListActions = myListSlice.actions;

export default store;
export {
  MovieStoreActions,
  latestMoviesActions,
  trendingMovieActions,
  mostLikedActions,
  nowPlayingTVStore,
  trendingStoreActions,
  latestTVactions,
  mostLikedTvActions,
  AuthSliceActions,
  myListActions,
  removeFromList,
};
