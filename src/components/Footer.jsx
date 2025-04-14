import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-3'>
        <div className='flex items-center justify-center gap-4'>
          <Link to='/'>About</Link>
          <Link to='/'>Contact</Link>
          <Link to='/'>Terms</Link>
          <Link to='/'>Privacy</Link>
        </div>
        <p className='text-sm'>&copy; {currentYear} movieneXt. All rights reserved by Manohar Mamidi.</p>
    </footer>
  )
}

export default Footer
