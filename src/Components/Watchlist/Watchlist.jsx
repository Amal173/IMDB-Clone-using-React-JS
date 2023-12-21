import React, { useEffect } from 'react';
import './Watchlist.css';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, fetchAsyncMoviesByWatchlist, removeSearchedMovies, removeMoviesFromWatchlist } from '../../Redux/Movies/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';

function Watchlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlistData = useSelector(getWatchlist);
  const url = 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/';

  console.log("watchlistData", watchlistData);
  function componentDidMount() {
    window.scrollTo(0, 0);
  }
  async function handleWatchlist(Data) {
    await dispatch(removeMoviesFromWatchlist(Data._id));
    dispatch(fetchAsyncMoviesByWatchlist());
  }

  function handleClick(id) {
    componentDidMount();
    dispatch(removeSearchedMovies());
    navigate('/Movie', { state: { data: id } });
  }

  useEffect(() => {
    componentDidMount()
    dispatch(fetchAsyncMoviesByWatchlist())
  }, [dispatch])


  let renderMovies = null;

  if (Array.isArray(watchlistData) & watchlistData.length > 0) {
    renderMovies = watchlistData.map((Data) => (
      <>
        <div className='' key={Data.movie.id}>
          <div className="movieList shine" onClick={() => handleClick(Data.movie.id)} >
            <div className="movieImage">
              <img src={Data.movie.poster_path ? `${url}${Data.movie.poster_path}` : "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"} alt="" />
            </div>
            <div className="movieDetails">
              <p>{Data.movie.title || "unavailable"}</p>
              <p>{Data.movie.release_date || "unavailable"}</p>
              <p>
                <i className="fa-solid fa-star"></i> {Data.movie.vote_average} (
                {Data.movie.vote_count})
              </p>
            </div>
          </div>
          <button className='removeWatchlistButton' onClick={() => handleWatchlist(Data)}>remove from watchlist</button>
          <div></div>
        </div>

      </>
    ));
  } else {
    renderMovies = <div className='error'>Currently No Movies In The Watchlist !</div>
  }

  return (
    <div className='watchlist'>
      <div className='container'>
        <div className='watchListOuterCard'>
          <p className='watchlistTitle'>Watchlist</p>
          <div className='watchlistCard'>
            {renderMovies}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Watchlist;
