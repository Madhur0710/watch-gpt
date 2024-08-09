import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const GptMovieSuggestions = () => {
    const gptMovies = useSelector((store) => store.movies.gptMovies);

    
    const filteredMovies = gptMovies.filter(movie => movie.poster_path);

    return (
        <div className='m-4 bg-black text-white bg-opacity-70'>
            {filteredMovies.length > 0 && (
                <div>
                    {filteredMovies.map((movie) => (
                        <MovieList
                            key={movie.id}
                            title={movie.title}
                            movies={[movie]} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GptMovieSuggestions;
