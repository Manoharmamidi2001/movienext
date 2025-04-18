import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UseFetchDetails from '../hooks/UseFetchDetails'
import Divider from '../components/Divider'
import UseFetch from '../hooks/UseFetch'
import HorizontalScrollCards from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'
import avatar from '../assets/avatar.png'

const DetailPage = () => {
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')
  const { explore, id } = useParams()
  const imageURL = useSelector(state => state.movieData.baseURL)

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[id])

  const detailsEndpoint =`/${explore}/${id}`
  const creditsEndpoint =`/${explore}/${id}/credits`
  const similarEndPoint =`/${explore}/${id}/similar`
  const recommendationsEndPoint =`/${explore}/${id}/recommendations`


  const { data } = UseFetchDetails(detailsEndpoint)
  const { data: castData } = UseFetchDetails(creditsEndpoint)
  const {data: similarData} = UseFetch(similarEndPoint)
  const {data: recommendData} = UseFetch(recommendationsEndPoint)

  if (!data) return <p className="text-center pt-20">Loading...</p>

  const getFormattedDuration = () => {
    const runtime = data.runtime || (data.episode_run_time && data.episode_run_time[0])
    if (!runtime) return null
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}m`
  }

  const handlePlayVideo = (data)=>{
    setPlayVideoId(data.id)
    setPlayVideo(true)
  }

  return (
    <div className="w-full">
      {/* Backdrop */}
      <div className="relative w-full h-[300px] md:h-[450px]">
        <img
          src={`${imageURL}/${data.backdrop_path}`}
          alt={data.title || data.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-3 -mt-40 relative z-10 flex flex-col items-center ">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Poster */}
          <div className="w-48 md:w-60  lg:-mt-32">
            <img
              src={`${imageURL}/${data.poster_path}`}
              alt={data.title || data.name}
              className="h-72 md:h-80 w-full object-cover rounded shadow-lg"
            />
            <button onClick={()=>handlePlayVideo(data)} className="group mt-3 w-full py-4 text-center bg-gradient-to-r from-red-600 via-orange-700 to-red-500 rounded-md text-xl text-white font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110 hover:shadow-lg overflow-hidden relative">
              <span className="relative z-10 group-hover:animate-pulse group-hover:tracking-widest transition-all duration-500 ease-in-out">
                Play Now
              </span>
            </button>

          </div>

          {/* Details */}
          <div className="text-white max-w-3xl lg:-mt-36">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{data.title || data.name}</h2>
            {data.tagline && <p className="italic text-gray-400 mb-2">"{data.tagline}"</p>}
            <Divider/>
            <p className="text-gray-200 leading-relaxed w-full md:w-[600px] lg:w-[700px]">
              {data.overview}
            </p>
            <Divider/>
            <div className='flex gap-1'>
            {data.release_date && (
              <p className="text-sm text-gray-300 mb-1">Release Date: {data.release_date} |</p>
            )}
            {data.vote_average && (
              <p className="text-sm text-yellow-400 mb-1">⭐{data.vote_average.toFixed(1)}+/10 <span className='text-white'>|</span></p>
            )}
            {getFormattedDuration() && (
                <p className="text-green-400">Runtime: {getFormattedDuration()}</p>
            )}
            </div>
            {data.genres && (
              <div className="flex flex-wrap gap-2 mb-3">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-neutral-700 text-xs px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            <Divider/>
            {/* Director */}
            <p>Director: <span className='font-bold'>{castData?.crew?.[1]?.name || "Unknown"}</span></p>
            <Divider />
            <p>Writer: <span className='font-bold'>{castData?.crew?.[4]?.name || "Unknown"}</span></p>
            <Divider/>
            <p>Producer: <span className='font-bold'>{castData?.crew?.[2]?.name || "Unknown"}</span></p>
            <Divider />
            <p className="text-lg font-semibold mb-2">Cast:</p>
            <div className="flex flex-wrap gap-4">
              {castData?.cast?.length > 0 ? (
                castData.cast.slice(0, 10).map((cast, index) => (
                  <div key={index} className="flex flex-col items-center w-24 text-center">
                    <img
                      src={cast.profile_path ? `${imageURL}/${cast.profile_path}` : `${avatar}`}
                      alt={cast.name}
                      className="rounded-full w-20 h-20 object-cover mb-1"
                    />
                    <p className="text-sm text-white font-bold">{cast.name}</p>
                  </div>
                ))
              ) : (
              <p className="text-center text-red-500">Failed to load cast data.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='px-10'>
      <Divider/>
      </div>
      <div>
      <HorizontalScrollCards data={similarData} heading={`Similar ${explore}s`}/>
      </div>
      <div>
        <HorizontalScrollCards data={recommendData} heading={`Recommended ${explore}s for you`}/>
      </div>
      {
        playVideo && (
          <VideoPlay videoId={playVideoId} close={()=>setPlayVideo(false)} endpoint={detailsEndpoint}/>
        )
      }
    </div>
  )
}

export default DetailPage
