import { configureStore, createSlice } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        trendingMovies = trendinfMoviesSlice.reducer
    }
})
