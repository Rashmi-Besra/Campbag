import React from 'react'

const ProgressBar = ({
  completion=70,
  completedField=7,
  totalField=10,
}) => {
  completedField=Math.round((completedField/totalField)*100);
  const remainingField=totalField-completedField;
  const safeCompletion=Math.min(Math.max(completion,0),100);

  return (
    <div className='bg-white border border-gray-200 p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>
          Profile Completion
        </h2>
        <span className='text-indigo-600 font-bold text-lg'>
          {completion}%
        </span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-4 overflow-hidden'>
        <div className='bg-pink-300 h-4 rounded-full transition-all duration-700 ease-in-out'
        style={{width :`${safeCompletion}%`}}>

        </div>
        </div>
        {/* Progress Text */}
        <div className='mt-6 space-y-2'>
          <p className='text-gray-700'>
            <span className='font-semibold'>
              {completedField}
            </span>
            {" "}of{" "}
            <span className='font-semibold'>{totalField}</span>
            {" "}profile sections completed.
          </p>
          <p className='text-gray-500'>
            completed the remaining details to unlock all CAMPBAG features.

          </p>

        </div>

        {/* Bottom Section */}

        <div className='mt-6 flex justify-between items-center'>
          <div>
            <p className='text-sm text-gray-500'>Remaining Section</p>
            <p className='text-xl font-bold text-red-500'>
              {remainingField}
            </p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>
              Status
            </p>
            <p
             className={`font-semibold ${
              completion ===100
              ? "text-green-600"
              : "text-yellow-500"
            }`}>

              {completion ===100
              ? "completed" 
            :"In Progress"}
            </p>
          </div>
        </div>
      </div>

  )
}

export default ProgressBar
