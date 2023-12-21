import React, { useEffect, useState } from 'react';
import './MovieCard.css';
import { removeSearchedMovies, createMoviesToWatchlist, removeMoviesFromWatchlist, fetchAsyncMoviesByWatchlist, getWatchlist } from '../../Redux/Movies/MovieSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MovieCard(Data) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlistData = useSelector(getWatchlist);

  function componentDidMount() {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const inWatchlist = watchlistData.some((movie) => movie.movie.id === Data.Data.id);
    setIsInWatchlist(inWatchlist);
  }, [watchlistData, Data.Data.id]);

  async function handleWatchlist(Data) {
    const isInWatchlist = watchlistData.some((movie) => movie.movie.id === Data.Data.id);

    if (isInWatchlist) {
      // Movie is in watchlist, so remove it
      const movieToRemove = watchlistData.find((movie) => movie.movie.id === Data.Data.id);
      if (movieToRemove) {
        await dispatch(removeMoviesFromWatchlist(movieToRemove._id));
      }
    } else {
      // Movie is not in watchlist, so add it

      await dispatch(createMoviesToWatchlist(Data));
    }

    // Update the isInWatchlist variable after the dispatch
    setIsInWatchlist(!isInWatchlist);
    dispatch(fetchAsyncMoviesByWatchlist())
  }

  function handleClick() {
    componentDidMount();
    dispatch(removeSearchedMovies());
    navigate('/Movie', { state: { data: Data.Data.id } });
  }

  if (Data && Data.Data && Data.Data.release_date) {
    const ReleaseDate = Data.Data.release_date.split('-', 1);
    const url = 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/';

    return (
      <div className='card'>
        <div className="movieList shine" onClick={handleClick}>
          <div className="movieImage">
            <img src={Data.Data.poster_path ? `${url}${Data.Data.poster_path}` : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"} alt="" />
          </div>
          <div className="movieDetails">
            <p>{Data.Data.title}</p>
            <p>{ReleaseDate}</p>
            <p>
              <i className="fa-solid fa-star"></i> {Data.Data.vote_average} (
              {Data.Data.vote_count})
            </p>
          </div>
        </div>
        <button className='addWatchlistButton' onClick={() => handleWatchlist(Data)}>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default MovieCard;
