"use client"
import { FaStar } from "react-icons/fa";
import React from 'react'
import Image from 'next/image'
function moviecard({ movie }) {
  let {title,poster_path,overview,rate,genres=[]}=movie
 
  
  return (
    <div className='movie-card'>
      <div className='poster_image_movie'>
        <Image
          src={'https://image.tmdb.org/t/p/w500' + poster_path}
          width={150}
          height={150}
          objectFit='cover'
          alt={title+'image'} />
      </div>
      <div className=''>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className="movie-overview">{overview}</p>
        <div  className="">
          <p className="flex gap-1 text-yellow-400">
            <FaStar />
            <span>{rate.toFixed(1)}</span>
         </p>
         <div className='flex gap-2'>
            {genres.map(el=>{
              return(
                 <span key={el} className="p-2 rounded-full bg-black text-white text-sm font-medium">{el}</span>
              )
            })}
         </div>
        </div>
      </div>
    </div>
  )
}

export default moviecard