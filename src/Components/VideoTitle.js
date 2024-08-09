import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black'>
     <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
     <p className='py-6 text-lg w-1/4 hidden md:inline-block'>{overview}</p>
     <div className='flex gap-2 my-3 md:m-0'>
        <button className='bg-white text-black  px-5 md:px-14 text-xl rounded-lg py-1 md:py-4 hover:bg-opacity-80'>Play</button>
        <button className='hidden md:inline-block bg-gray-500 text-white px-12 text-xl hover:bg-opacity-75 bg-opacity-45 rounded-lg p-4'>More Info</button>
     </div>
    </div>
  )
}

export default VideoTitle