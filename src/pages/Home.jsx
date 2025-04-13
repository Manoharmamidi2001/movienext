import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCards from '../components/HorizontalScrollCard'

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)
  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCards data={trendingData} heading={'Trending'}/>
    </div>
  )
}

export default Home
