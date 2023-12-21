import React from 'react'
import { useNavigate } from 'react-router-dom';
import './SearchSuggestions.css'
import { useDispatch } from 'react-redux';
import { removeSearchedMovies } from '../../Redux/Movies/MovieSlice';

function SearchSuggestions({ Data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function HandleClick() {
        dispatch(removeSearchedMovies());
        navigate("/Movie", { state: { data: Data.id } });

    }
    const { title, poster_path, release_date } = Data;
    const release = release_date.split("-", 1)
    const url = `http://image.tmdb.org/t/p/w300_and_h450_bestv2/`
    console.log("title:", title);
    return (
        <div className='SearchSuggestions' onClick={HandleClick}>
            <div className='searchContent'>
                <div className='movieimg'>
                    <img src={`${url}${poster_path}`} alt="" />
                </div>

                <div className='aboutMovie'>
                    <p>{title}</p>
                    <p>{release}</p>

                </div>
            </div>
        </div>
    )
}

export default SearchSuggestions


