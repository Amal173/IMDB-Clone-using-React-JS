import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import SearchSuggestions from '../Searchsuggestions/SearchSuggestions';
import { fetchAsyncMoviesDetails, getSelectedMovie, getRelatedMovie, getWatchlist, removeMoviesFromWatchlist, fetchAsyncMoviesByWatchlist, createMoviesToWatchlist, getSearchedMovie, removeSelectedMovies, fetchAsyncMoviesByRelated } from '../../Redux/Movies/MovieSlice'
import './MovieDetails.css'
import Footer from '../Footer/Footer';
function MovieDetails() {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const url = `http://image.tmdb.org/t/p/w300_and_h450_bestv2/`;
    const location = useLocation();
    const MovieID = location.state.data;
    console.log("params:", MovieID);
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovie)
    const relateddata = useSelector(getRelatedMovie)
    const searchSuggestions = useSelector(getSearchedMovie);
    const watchlistData = useSelector(getWatchlist);
    console.log("related movies data:", relateddata.results);
    console.log("get 1 movie:", data);

    useEffect(() => {
        dispatch(fetchAsyncMoviesByRelated(MovieID));
        dispatch(fetchAsyncMoviesDetails(MovieID));
        return () => {
            dispatch(removeSelectedMovies())
        };
    }, [dispatch, MovieID]);
    const time = data.runtime;
    var Hours = Math.floor(time / 60)
    var minutes = time % 60
    const Relateddata = relateddata.results;
    const SearchData = searchSuggestions.results;
    let SearchSuggestion = '';
    if (SearchData) {

        SearchSuggestion = SearchData.slice(0, 5);
    }
    console.log("SearchSuggestion", SearchSuggestion);
    let renderSuggestion = null;
    if (SearchSuggestion) {
        renderSuggestion = SearchSuggestion.map((data) => (
            <SearchSuggestions Data={data} key={data.id} />
        ));
    }
    let renderMovies = null;
    if (Relateddata) {
        renderMovies = Relateddata.map((Data) => (
            <MovieCard Data={Data} key={Data.id} />
        ));
    } else {
        renderMovies = <div className="err">Movie is not found</div>;
    }
    useEffect(() => {
        const inWatchlist = watchlistData.some((movie) => movie.movie.id === data.id);
        setIsInWatchlist(inWatchlist);
    }, [watchlistData, data.id]);
    async function handleWatchlist(Data) {

        const isInWatchlist = watchlistData.some((movie) => movie.movie.id === Data.id);

        console.log("sdsdbsddb", isInWatchlist);
        if (isInWatchlist) {
            const movieToRemove = watchlistData.find((movie) => movie.movie.id === Data.id);
            console.log("sdsdbsddb", movieToRemove);
            if (movieToRemove) {
                await dispatch(removeMoviesFromWatchlist(movieToRemove._id));
            }
        } else {
            await dispatch(createMoviesToWatchlist(Data));
        }
        setIsInWatchlist(!isInWatchlist);
        dispatch(fetchAsyncMoviesByWatchlist())
    }
    let renderGener = "";
    if (Array.isArray(data.genres)) {
        renderGener = data.genres.map((data) => (
            <p>{data.name}</p>

        ))
    }
    return (
        <div className='container'>
            <div className='backgroundImage'>
            </div>
            <div className='MovieDetails'>
                <div className='movieImage'>
                    <img src={data.poster_path ? `${url}${data.poster_path}` : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"} alt="" />
                </div>
                <div className='aboutMovie'>
                    <div className='movieTitle'>
                        <div className='aboutMovieHeader'>
                            <h6>
                                {data.title}({data.original_language})
                            </h6>
                            <div className='genres'> {renderGener}</div>
                        </div>
                        <h5 ><i class="fa-solid fa-star"></i> {data.vote_average}
                        </h5>
                    </div>
                    <div className='movieDuration'>
                        <div className='movieDurationTitle'>
                            <h5>Duration</h5>
                            <p>{Hours} hour  {minutes} minutes</p>
                        </div>
                        <div className='MovieDetailsAddWatchlistButton'>
                            <button onClick={() => handleWatchlist(data)}>
                                {isInWatchlist ? <p>Remove From Watchlist <i class="fa-solid fa-bookmark"></i> </p> : <p>Add To Watchlist <i class="fa-regular fa-bookmark"></i> </p>}
                            </button>
                        </div>
                    </div>
                    <div className='releaseDate'>
                        <h5>Release Date</h5>
                        <p>{data.release_date}
                        </p>
                    </div>
                    <div className='overView'>
                        <h5>Overview</h5>
                        <p>{data.overview}</p>
                    </div>
                </div>
            </div>
            <div>
                <p className='relatedTitle'>Related Movies</p>
                <div className='relatedMovieList'>
                    {renderMovies}
                    <div className='relatedFooter'>
                        <Footer />
                    </div>
                </div>
            </div>
            <div className='SerchedMovieSuggestion'>
                {renderSuggestion}
            </div>
        </div>
    )
}

export default MovieDetails