import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies } from '../../Redux/Movies/MovieSlice';
import './Home.css'

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAsyncMovies())
    }, [dispatch]);

    return (
        <>
            <div className='Home'>
                <div className='container'>
                    <MovieListing />
                </div>
            </div>

        </>

    )
}

export default Home