import React from 'react'
import { useSelector } from 'react-redux'

const BannerHome = () => {
    const bannerData = useSelector(state=> state.movieData.bannerData)
    const imageURL = useSelector(state => state.movieData.baseURL)  

    console.log('bannerData', bannerData);
    
  return (
    <section className='w-full h-full'>
        <div className='flex min-w-full min-h-[50vh]'>
            {bannerData.map((item, index)=>{
                return(
                    <div className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative'>
                        <div className='w-full h-full'>
                            <img 
                            src={`${imageURL}${item.backdrop_path}`} 
                            alt={`${imageURL}`}
                            className='h-full w-full object-cover'
                            />
                        </div>
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent'></div>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default BannerHome
