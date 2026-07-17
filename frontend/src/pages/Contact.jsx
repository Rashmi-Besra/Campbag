import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t '>
        <Title text1={'Contact'} text2={'Us'} />
      </div>
      <div className='flex flex-row w-full sm:w-full sm:w-[400px] w-[200px] px-15  my-8 gap-10'>
        <div className='border h-100 w-full gap-6'>
          <p className='flex items-center justify-center text-2xl my-5'>Contact us on:</p>
          <p className='text-gray-600 text-xl flex justify-center items-center px-10 text-left'>Email: campusbag@gmail.com</p>
          <p className='text-gray-600 text-xl flex justify-center items-center px-10 text-left'>Contact no: xxx xxxx xxx</p>

      </div>
      <div className='border h-100 w-full sm:w-full gap-6'>
          <p className='flex items-center justify-center text-2xl my-5'>Join us:</p>
          <p className='text-gray-600 text-xl flex justify-center items-center px-10'>Email: xyz@gmail.com</p>
          <p className='text-gray-600 text-xl flex justify-center items-center px-10'>Contact No: +xxx xxxx xxx</p>
           <p className='flex items-center justify-center text-2xl my-5'>Guidance:</p>
            <p className='text-gray-600 text-base flex justify-center items-center px-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dignissimos autem sint exercitationem quod nihil voluptatum iure, iusto non itaque!</p>


      </div>

      </div>
      
      <div>

      </div>
      
      <NewsletterBox/>

    </div>
  )
}

export default Contact
