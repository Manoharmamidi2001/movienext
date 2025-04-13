import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const BannerHome = () => {
    const bannerData = useSelector(state=> state.movieData.bannerData)
    const imageURL = useSelector(state => state.movieData.baseURL)  
    const [image, setImage] = useState(0)

    const handleNext=()=>{
        if(image < bannerData.length-1){
            setImage(prev => prev+1)
        }
    }

    const handlePrevious = ()=>{
        if(image > 0){
            setImage(prev => prev-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(image < bannerData.length-1){
                handleNext()
            }else{
                setImage(0)
            }
        },5000)

        return ()=> clearInterval(interval)
    }, [bannerData, imageURL])
    
  return (
    <section className='w-full h-full'>
        <div className='flex min-w-full max-h-[95vh]'>
            {bannerData.map((item, index)=>{
                return(
                    <div key={index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{transform: `translateX(-${image * 100}%)`}}>
                        <div className='w-full h-full'>
                            <img 
                            src={`${imageURL}${item.backdrop_path}`} 
                            alt={`${imageURL}`}
                            className='h-full w-full object-cover'
                            />
                        </div>
                        <div className='absolute top-0 h-full w-full hidden justify-between items-center px-4 group-hover:lg:flex'>
                            <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black opacity-50'>
                                <FaAngleLeft/>
                            </button>
                            <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black opacity-50'>
                                <FaAngleRight/>
                            </button>
                        </div>
                        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent'></div>
                        <div className='container mx-auto w-full'>
                            <div className='p-5 absolute bottom-0 max-w-full'>
                                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{item.original_title ? item.original_title : item.original_name}</h2>
                                <p className='text-ellipsis line-clamp-2 my-2'>{item.overview}</p>
                                <div key={index} className='flex items-center gap-4'>
                                    <p>Rating: {`${Number(item.vote_average).toFixed(1)}+`}</p>
                                    <span>|</span>
                                    <p>Views: {`${Number(item.popularity).toFixed(0)}`}</p>
                                </div>
                                <button className='bg-red-700 px-4 py-2 text-white font-bold rounded mt-4'>
                                    Play Now
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default BannerHome
