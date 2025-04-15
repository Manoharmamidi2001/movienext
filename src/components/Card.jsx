import moment from 'moment/moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({ data, trending, index, media_type, className }) => {
  const imageURL = useSelector(state => state.movieData.baseURL)
  const mediaType = data.media_type ?? media_type

  const fallbackImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA-_-7S54eHe3UkAho56myjd5yrbYBUptCVA&s'

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      className='w-full min-w-[250px] max-w-[250px] h-90 overflow-hidden rounded relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl'
    >
      <img
        src={data.poster_path ? `${imageURL}${data.poster_path}` : `${fallbackImg}`}
        alt={data.title || data.name}
        onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg }}
        className='w-full h-[375px] object-cover transition-all duration-300'
      />

      <p className='absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-full font-bold text-white text-sm'>⭐ {Number(data.vote_average).toFixed(1)}</p>
      {/* Trending Ribbon */}
      {trending && (
        <div className='absolute top-0 left-0 bg-gradient-to-r from-red-700 via-orange-500 to-yellow-400 p-1 font-bold text-black bg-opacity-30'>
          #<span className='text-white text-4xl'>{index}</span> Trending
        </div>
      )}

      {/* Bottom Info */}
      <div className={`absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2 ${className}`}>
        <h2 className='truncate text-lg font-semibold text-white'>
          {data.original_title || data.original_name}
        </h2>
        <div className='text-sm text-neutral-400 flex justify-between items-center'>
          <p>{moment(data.release_date || data.first_air_date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card