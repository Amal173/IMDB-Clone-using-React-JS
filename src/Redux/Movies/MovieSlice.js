import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../Common/APIs/MovieApi";
import { api_key } from "../../Common/MovieApiKey";
import axios from "axios";

const initialState = {
    movies: {},
    selectedMovie: {},
    searchMovie: {},
    relatedMovie: {},
    watchlist: [],
    watchlistMovieData: {}
}

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const response = await MovieApi.get(`/movie/popular?language=en-US&page=1&api_key=${api_key}`);
    console.log("response data", response);
    return response.data
});
export const fetchAsyncMoviesDetails = createAsyncThunk('movies/fetchAsyncMoviesDetails', async (id) => {
    console.log("res id get 1:", id);
    const response = await MovieApi.get(`/movie/${id}?language=en-US&api_key=${api_key}`);
    console.log("response data of get 1", response);
    return response.data
});
export const fetchAsyncMoviesBySearch = createAsyncThunk('movies/fetchAsyncMoviesBySearch', async ({ query }) => {
    console.log("res query:", query);
    const response = await MovieApi.get(`/search/movie?query=${query}&language=en-US&api_key=${api_key}`);
    console.log("response data of search", response);
    return response.data

});
export const fetchAsyncMoviesByRelated = createAsyncThunk('movies/fetchAsyncMoviesByRelated', async (id) => {
    console.log("res id related:", id);
    const response = await MovieApi.get(`/movie/${id}/similar?language=en-US&page=1&api_key=${api_key}`);
    console.log("response data of related", response);
    return response.data

});
export const fetchAsyncMoviesByWatchlist = createAsyncThunk('movies/fetchAsyncMoviesByWatchlist', async () => {
    const response = await axios.get("http://localhost:5001/movies")
    console.log("response data of related", response);
    return response.data

});
export const removeMoviesFromWatchlist = createAsyncThunk('movies/removeMoviesFromWatchlist', async (id) => {
    const response = await axios.delete(`http://localhost:5001/movies/${id}`)
    console.log("deleted", response);
    return response.data

});
export const createMoviesToWatchlist = createAsyncThunk('movies/createMoviesToWatchlist', async (Data) => {
    try {
        const payload = {
            movie: Data.Data || Data,
        };

        const response = await axios.post("http://localhost:5001/movies", payload, {
        });

        console.log("response data of related", response);
        return response.data;
    } catch (error) {
        console.error("Error creating movies to watchlist:", error.response);
        throw error;
    }
});





const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovies: (state) => {
            state.selectedMovie = {}
        },
        removeSearchedMovies: (state) => {
            state.searchMovie = {}
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
            state.movies = payload
        })
        builder.addCase(fetchAsyncMoviesDetails.fulfilled, (state, { payload }) => {
            state.selectedMovie = payload
        })
        builder.addCase(fetchAsyncMoviesBySearch.fulfilled, (state, { payload }) => {
            state.searchMovie = payload
        })
        builder.addCase(fetchAsyncMoviesByRelated.fulfilled, (state, { payload }) => {
            state.relatedMovie = payload
        })
        builder.addCase(fetchAsyncMoviesByWatchlist.fulfilled, (state, { payload }) => {
            state.watchlist = payload
        })
        builder.addCase(createMoviesToWatchlist.fulfilled, (state, { payload }) => {
            state.watchlistMovieData = payload

        })
    },
}
);

export const { removeSelectedMovies, removeSearchedMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const getSearchedMovie = (state) => state.movies.searchMovie;
export const getRelatedMovie = (state) => state.movies.relatedMovie;
export const getWatchlist = (state) => state.movies.watchlist;
export default movieSlice.reducer;