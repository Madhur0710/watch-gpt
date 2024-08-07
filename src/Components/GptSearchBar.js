import React from 'react'
import lang from '../Utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

   const langkey = useSelector(store => store.config.lang);


  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='bg-black w-1/2 grid grid-cols-12'>
         <input className='col-span-9 p-4 rounded-lg m-4' type='text' placeholder={lang[langkey].gptSearchPlaceholder} />
         <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>{lang[langkey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar