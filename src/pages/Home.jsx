import React from 'react'
import BannerHome from '../components/BannerHome'
import HorizontalScrollCards from '../components/HorizontalScrollCard'
import UseFetch from '../hooks/UseFetch'
import { useSelector } from 'react-redux'

const Home = () => {
  const trendingData = useSelector(state=> state.movieData.bannerData)
  const {data: nowPlayingData} = UseFetch(`/movie/now_playing`)
  const {data: popularData} = UseFetch(`/movie/popular`)
  const {data: topRated} = UseFetch(`/movie/top_rated`)
  const {data: popularTvShows} = UseFetch(`/tv/popular`)
  const {data: upComming} = UseFetch(`/movie/upcoming`)
  
  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCards data={trendingData} heading={'Trending'} trending={true}/>
      <HorizontalScrollCards data={nowPlayingData} heading={'Now Playing'}/>
      <HorizontalScrollCards data={popularData} heading={'Popular'}/>
      <HorizontalScrollCards data={topRated} heading={'Top Rated'}/>
      <HorizontalScrollCards data={popularTvShows} heading={'Popular Tv Shows'}/>
      <HorizontalScrollCards data={upComming} heading={'Upcoming'}/>
    </div>
  )
}

export default Home
