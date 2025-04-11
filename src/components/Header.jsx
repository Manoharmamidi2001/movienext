import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import user from '../assets/user.png'
import { IoSearchSharp } from "react-icons/io5";
import { navigation } from '../contents/Navigation';

const Header = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const handleChange = (e)=>{
        setInput(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    

    useEffect(()=>{
        if(input){
            navigate(`/search?q=${input}`)
        }else{
            navigate(`/`)
        }
    }, [input])
  return (
    <>
        <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-50 z-40'>
            <div className='container px-5 flex items-center h-full'>
                <Link to={`/`} className='pt-3'>
                    <img src={logo} alt="logo.jpg" width={120}/>
                </Link>
                <nav className='hidden lg:flex gap-5'>
                    {navigation.map((nav, index)=>{
                        return(
                            <>
                                <NavLink key={nav.label} to={nav.href} className={({isActive})=>`px-2 hover:text-neutral-50 ${isActive && "text-neutral-50"} active:scale-50 transition-all`}>
                                    {nav.label}
                                </NavLink>
                            </>
                        )
                    })}
                </nav>
                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center' onSubmit={handleSubmit}>
                        <input type="text" placeholder='Search here...' className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block' value={input} onChange={handleChange}/>
                        <div className='flex '>
                        <button className='text-2xl text-neutral-300 active:scale-50 transition-all'>
                            <IoSearchSharp />
                        </button>
                        </div>
                    </form>
                    <div className='w-10 h-10 rounded-full overflow-hidden active:scale-50 transition-all'>
                        <img src={user} width='w-full h-full' alt="" className='bg-red-600 p-2'/>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
