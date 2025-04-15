import moment from 'moment/moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({data, trending, index, media_type, className}) => {
    const imageURL = useSelector(state => state.movieData.baseURL)  

    const mediaType = data.media_type ?? media_type
  return (
    <Link to={`/${mediaType}/${data.id}`} className='w-full min-w-[250px] max-w-[250px] h-90 overflow-hidden rounded relative'>
      <img
        src={`${imageURL}${data.poster_path}`}
        alt={data.title}
      />
      <div className='absolute top-0'>
        {
            trending && (
                <div className='bg-gradient-to-r from-red-700 via-orange-500 p-1 font-bold bg-opacity-30 text-black '>
                    #<span className='text-white text-4xl'>{index}</span> Trending
                </div>
            )
        }
      </div>
      <div className={`absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2 opacity-90 ${className}`}>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data.original_title ? data.original_title : data.original_name}</h2>
        <div className='text-sm text-neautral-400 flex justify-between items-center'>
            <p>{moment(data.release_date).format('MMMM Do YYYY')}</p>
            <p className='bg-black px-1 rounded-full font-bold'>⭐{Number(data.vote_average).toFixed(1)}</p>
        </div>
      </div>
    </Link>
  )
}

export default Card
