import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './Movies/MovieSlice';
export default configureStore({
    reducer: {
        movies: moviesReducer,
    }
})