import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getSearchedMovie } from '../../Redux/Movies/MovieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.css'
import Footer from '../Footer/Footer';

function MovieListing() {
    const SearchedMovie = useSelector(getSearchedMovie);
    const movies = useSelector(getAllMovies);
    const popularMovies = movies.results;
    const data = (SearchedMovie.results === undefined || null || '') ? popularMovies : SearchedMovie.results;
    console.log("Data:", data);
    let renderMovies = null;
    const checkData = data !== undefined ? data.length : false
    if (checkData > 0) {
        renderMovies = data.map((Data) => (
            <MovieCard Data={Data} key={Data.id} />
        ));
    } else {
        renderMovies = <div className="err">Searched Movie is not found</div>;
    }

    return (
        <>
            <div className='movieBanner'>
                <p className='popularMoviesTitle'>{SearchedMovie.results ? "Search Results" : "Popular Movies"}</p>
                <div className='MovieList'>
                    {renderMovies}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default MovieListing;