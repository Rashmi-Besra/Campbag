import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-[#132440]'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta adipisci, vel, eveniet dolorem dignissimos veritatis similique error aperiam beatae autem sunt quas facere mollitia commodi saepe quasi, ea atque reprehenderit.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-[#132440]'>
                <li>Home</li>
                <Link to='/about'><li>About</li></Link>
                <li>Delivery</li>
                <Link to='/contact'><li>Contact</li></Link>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-[#132440]'>
                <li>+1-212-456-789</li>
                <li>contact@forverforu.com</li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026@ forever.com - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
