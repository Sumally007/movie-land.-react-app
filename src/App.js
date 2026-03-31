import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
const API_URL = 'https://www.omdbapi.com?apikey=5bcea206'

// const movie = {
//     "Title": "The Amazing Spiderman 2 Webb Cut",
//     "Year": "2021",
//     "imdbID": "tt18351128",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNzI0MmQyMzYtZDAzNi00ZWZiLWFjMTgtNzQwOTRjYTFlM2Y3XkEyXkFqcGc@._V1_SX300.jpg"
// }


const App = (title) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data.Search)
        setMovies(data.Search)
    }


    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movie'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0 ? (
                    <div className='container'>
                        {movies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }


        </div>

    );
}

export default App;