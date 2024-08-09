import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../Utils/constants'

const GptSearchPage = () => {
  return (
    <>
       <div className='fixed -z-10'> 
            <img className='h-screen object-cover w-screen' src={BG_URL} alt='' />
        </div>
    <div className=''>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
    </>
  )
}

export default GptSearchPage