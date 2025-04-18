import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileView from './components/MobileView'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBannerData, setBaseURL } from './store/movieNextSlice'

const App = () => {
  const dispatch = useDispatch()

  const fetchTrending = async()=>{
    try {
      const response = await axios.get(`/trending/all/week`)
      dispatch(setBannerData(response.data.results))
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
    <main>
      <Header/>
        <div className="flex-1 min-h-[100vh] pb-20">
        <Outlet/>
        </div>
      <Footer/>
      <MobileView/>
    </main>
  )
}

export default App
