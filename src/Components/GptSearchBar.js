import React, { useRef } from 'react'
import lang from '../Utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../Utils/constants';
import {addgptMovies} from '../Utils/moviesSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
   const langkey = useSelector(store => store.config.lang);

   const handleSearch = async (e) => {
    e.preventDefault();
    const query = inputRef.current?.value; 


    if (!query) return;


    try {
        const response = await fetch(
           `https://api.themoviedb.org/3/search/movie?query=${(query)}&include_adult=false&language=en-US&page=1`
            , API_OPTIONS);
            
        
        const data = await response.json();
  
        if (data.results) {
          dispatch(addgptMovies(data.results));
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };


  return (
    <div className='pt-[40%] md:pt-[10%] flex justify-center'>
        <form className='bg-black w-full md:w-1/2 grid grid-cols-12' onSubmit={handleSearch}>
         <input ref={inputRef} className='col-span-9 p-4 rounded-lg m-4 outline-none' type='text' placeholder={lang[langkey].gptSearchPlaceholder} />
         <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>{lang[langkey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar