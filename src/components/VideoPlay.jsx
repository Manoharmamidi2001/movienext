import React from 'react'
import { IoClose } from 'react-icons/io5'
import UseFetchDetails from '../hooks/UseFetchDetails'

const VideoPlay = ({ data, close, endpoint }) => {
    const {data: videoData} = UseFetchDetails(`${endpoint}/videos`)
    
  return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-black w-[95%] h-[40vh] sm:w-[90%] sm:h-[50vh] md:w-[80%] md:h-[60vh] lg:max-w-screen-lg lg:h-[70vh] aspect-video rounded relative'>
        <button
          onClick={close}
          className='absolute -right-1 -top-6 text-3xl z-50 text-white'
        >
          <IoClose />
        </button>
        {videoData?.results?.length > 0 && (
            <iframe
                src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
                className="w-full h-full"
                title="Video Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            )}
      </div>
    </section>
  )
}

export default VideoPlay
