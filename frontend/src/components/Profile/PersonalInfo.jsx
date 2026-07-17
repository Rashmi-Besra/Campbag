import React from 'react'
import { FiCamera } from 'react-icons/fi'
const PersonalInfo = ({profile}) => {
  return (
    <div className='bg-white  border border-gray-200 p-6'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6 '>
        Personal Information
      </h2>
      <div className='flex flex-col items-center mb-8'>
        <div className='relative'>
          {
            profile.profileImage?(
              <img src={profile.profileImage} alt="profile"
              className='w-28 h-28 rounded-full object-cover border-4 border-indigo-100' />
              ):(
                <div className='w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300'>
                  <FiCamera
                  className='text-4xl text-gray-400'/>
                  
                </div>
              )
          }
          <button className='absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full'>
            <FiCamera/>
          </button>
          </div> 
          <p className='text-sm text-gray-500 mt-3'>
            Upload Profile photo
          </p>
      </div>

      {/*Form */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/*Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Full Name
          </label>
          <input type="text" default={profile.name}
          placeholder='Enter your fullname'
          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none' />
        </div>
        {/*Phone no */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
           <input type="text" default={profile.phone}
          placeholder='Enter your phone number'
          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none' />
        </div>
        {/*college email */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>College email</label>
           <input type="email"  value={profile.collegeEmail}
          disabled
          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none' />
        </div>
        {/*Personal Email */}
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Personal Email</label>
           <input type="email" default={profile.pesonalEmail}
          placeholder='Enter your personal Email'
          className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none' />
        </div>

      </div>
      
    </div>
  )
}

export default PersonalInfo
