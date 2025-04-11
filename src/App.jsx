import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileView from './components/MobileView'

const App = () => {
  return (
    <div>
      <Header/>
        <div className='pt-16'>
        <Outlet/>
        </div>
      <Footer/>
      <MobileView/>
    </div>
  )
}

export default App
