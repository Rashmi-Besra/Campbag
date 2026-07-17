import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'
const Verificationbanner = ({collegeEmail}) => {
  return (
    <div className='bg-green-50 border border-green-200 rounded-2xl p-5'>
      <div className='fles items-start gap-4'>
        <div className='bg-green-100 p-3 rounded-full'>
          <FiCheckCircle className='text-green-600 text-2xl'/>
          </div>

          <div className='flex-1'>
            <h2 className='text-lg font-semibold text-green-700'>
              Student Verified
            </h2>

            <p className='text-green-600 mt-1'>
              Your college email has been successfully verified.
              You can safelybuy and sell within your campus.
            </p>
            <div className='mt-4 bg-white border border-green-200 rounded-lg px-4 py-3'>
              <p className='text-sm text-gray-500'>
                Verified college Email 
              </p>
              <p className='font-medium text-gray-800 mt-1'>
                {collegeEmail}
              </p>

            </div>
          </div>
      </div>
    </div>
  )
}

export default Verificationbanner
