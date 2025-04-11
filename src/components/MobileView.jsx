import React from 'react'
import { mobileNavigation } from '../contents/Navigation'
import { NavLink } from 'react-router-dom'

const MobileView = () => {
  return (
    <section className='lg:hidden h-20 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full p-4'>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}} className='text-neutral-400'>
            {mobileNavigation.map((nav, index)=>{
            return (
                <NavLink to={`${nav.href}`} key={nav.label+'mobileNavigation'} className={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-white"} `}>
                    <div className='text-3xl'>
                        {nav.icon}
                    </div>
                    <p>{nav.label}</p>
                </NavLink>
            )
            })}
        </div>
    </section>
  )
}

export default MobileView
    