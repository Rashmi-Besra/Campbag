import React from 'react'

const AcademicInfo = ({profile}) => {
  return (
    <div className='bg-white  border border-gray-200 p-6'>
      {/*Heading */}
      <h2 className='text-2xl font-semiold text-gray-800 mb-6'>
        Academic Information
      </h2>

      {/*Form */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/*Registration Number */}
        <div>
          <label className='block text-sm font-mediumtext-gray-700 mb-2'>Registration Number</label>
          <input type="text"
          value={profile.registrationnumber}
          disabled
          className='w-full border border-gray-300 rounded-lg px-4py-3 bg-gray-100 cursor-not-allowed' />

        </div>

        {/*Branch */}
        <div>
           <label className='block text-sm font-mediumtext-gray-700 mb-2'>Branch</label>
         <select defaultValue={profile.branch} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:rinf-indigo-500 focus:outline-none'>

          <option value="">Select Branch</option>
          <option value="CSE">Computer Science and Engineering</option>
          <option value="ECE">Electronics & communication</option>
          <option value="EE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Civil Engineeing</option>
          <option value="MME">Material and Metallurgical Engineering</option>
          <option value="PIE">Production and Industrial Engineering</option>
          <option value="ECM">Electronics and computer engineering</option>
         </select>
        </div>
        {/*Semester */}
        <div>
        <label className='block text-sm font-mediumtext-gray-700 mb-2'>Semester</label>
        <select defaultValue={profile.semester} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:rinf-indigo-500 focus:outline-none'>
          <option value="">Select Semester</option>
          {[1,2,3,4,5,6,7,8].map((semester)=>(
            <option value={semester} key={semester}>{semester}</option>
          ))}
          </select>
        </div>
       
      </div>
    </div>
  )
}

export default AcademicInfo
