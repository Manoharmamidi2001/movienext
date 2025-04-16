import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import user from '../assets/user.png'
import { IoSearchSharp } from "react-icons/io5";
import { navigation } from '../contents/Navigation';

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // ✅ Get and sanitize query from URL
  const getInitialQuery = () => {
    const rawQuery = location.search.slice(3)
    return decodeURIComponent(rawQuery).replace(/[^a-zA-Z0-9 ]/g, '')
  }

  const [input, setInput] = useState(getInitialQuery())

  const handleChange = (e) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
    setInput(sanitized)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    setInput(getInitialQuery())
  }, [location.search])

  return (
    <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-50 z-40 backdrop-blur-sm'>
      <div className='container px-5 flex items-center h-full'>
        <Link to={`/`} className='pt-3'>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className='hidden lg:flex gap-5 ml-10'>
          {navigation.map((nav, index) => (
            <NavLink key={index} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-50 ${isActive && "text-neutral-50"} active:scale-50 transition-all`}>
              {nav.label}
            </NavLink>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder='Search here...'
              className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white'
              value={input}
              onChange={handleChange}
            />
            <button type='submit' className='text-2xl text-neutral-300 active:scale-50 transition-all hidden lg:block'>
              <IoSearchSharp />
            </button>
          </form>
          <div className='w-10 h-10 rounded-full overflow-hidden active:scale-50 transition-all'>
            <img src={user} alt="user" className='w-full h-full bg-red-600 p-2' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
