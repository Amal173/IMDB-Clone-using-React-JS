import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAsyncMoviesBySearch, getWatchlist, fetchAsyncMoviesByWatchlist } from '../../Redux/Movies/MovieSlice'
import { useDispatch, useSelector } from 'react-redux';
import { removeSearchedMovies } from '../../Redux/Movies/MovieSlice';
// import SearchSuggestions from '../Searchsuggestions/SearchSuggestions';
import './Header.css';
function Header() {

    const location = useLocation();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const WatchlistData = useSelector(getWatchlist);
    const watchlistLength = WatchlistData.length;
    // const SearchedMovie=useSelector(getSearchedMovie);
    useEffect(() => {
        dispatch(removeSearchedMovies());
        inputRef.current.value = "";
    }, [location, dispatch]);


    useEffect(() => {
        dispatch(fetchAsyncMoviesByWatchlist())
    }, [dispatch])
    function HandleWatchlist() {
        navigate("/Watchlist");
    }

    function HandleSearch({ query }) {

        if (query.length === 0) {
            dispatch(removeSearchedMovies());
            return
        }
        dispatch(fetchAsyncMoviesBySearch({ query }));
    }
    return (
        <>
            <header>
                <div className='container'>
                    <div className='navBar'>
                        <div className='brandLogo'>
                            <a href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/6/69/20200406194336%21IMDB_Logo_2016.svg/120px-IMDB_Logo_2016.svg.png" alt="" /></a>
                        </div>
                        <div className='hamburgerMenu'>
                            <i className="fa-solid fa-bars"></i>
                            <p>Menu</p>
                        </div>
                        <div className='searchBar'>
                            <input ref={inputRef} type="search" placeholder=" Search IMDB" onChange={event => HandleSearch({ query: event.target.value.trim() })} />
                            <div><i className="fa-solid fa-magnifying-glass"></i></div>
                        </div>
                        <button onClick={HandleWatchlist}> Watchlist<span className="material-symbols-outlined">
                            bookmarks
                        </span>({watchlistLength}) </button>
                        <button>Sign in</button>
                    </div>

                </div>
            </header>
            {/* <div> {renderError}</div> */}
        </>
    )
}
export default Header