import React from 'react'
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className='w-full h-120 flex flex-col sm:flex-row border border-gray-400'>
        {/*Hero left side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#132440] text-center sm:text-left'>
            <div className='flex items-center justify-center sm:justify-start gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#132440]'></p>
                <p className='font-medium text-sm md:text-base'>Stop Buying New</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Start Buying Smart.</h1>
            <div className='flex items-center justify-center sm:justify-start gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#132440]'></p>
            </div>
        </div>
        </div>
        <div className='w-full sm:w-1/2'>
            {/*Hero right side*/}
            <img className='w-full h-full object-cover' src={assets.hero_desk} alt="" />
        </div>
    </div>
  )
}

export default Hero
