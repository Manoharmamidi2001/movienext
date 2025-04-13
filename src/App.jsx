import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileView from './components/MobileView'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBannerData, setBaseURL, setTrendingData } from './store/movieNextSlice'

const App = () => {
  const dispatch = useDispatch()

  const fetchTrending = async()=>{
    try {
      const response = await axios.get(`/trending/all/week`)
      dispatch(setBannerData(response.data.results))
      console.log(response.data.results)
    } catch (error) {
      return error
    }
  }

  useEffect(()=>{
    fetchTrending()
    fetchConfiguration()
  }, [])

  const fetchConfiguration = async()=>{
    try {
       const response = await axios.get(`/configuration`)
       dispatch(setBaseURL(`${response.data.images.base_url}original`))       
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='pb-14 ld:pb-0'>
      <Header/>
        <div>
        <Outlet/>
        </div>
      <Footer/>
      <MobileView/>
    </main>
  )
}

export default App
