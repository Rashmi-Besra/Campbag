import React from 'react';
import {FiEdit} from "react-icons/fi";

const Profileheader = ({
  userName="Student",
  completion=60,
  onEdit,
}) => {
   const safeCompletion=Math.min(Math.max(completion,0),100);
 
  return (
    <div className='bg-white border border-gray-200  p-6 mb-6'>
     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Complete Your Profile
        </h1>
        <p className='text-gray-500 mt-2'>
          Welcome,{" "} <span className='font-semibold'>{userName}</span>
          {" "}complete your CAMPBAG profile to unlock all features and build your campus reputation.
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='bg-pink-300 text-white font-semibold px-4 py-2 rounded-full'>
          {completion}% Completed
        </div>
      </div>
    
     </div>
       <div className='mt-4'>
       
         <div className='w-full bg-gray-200 rounded-full h-4 overflow-hidden'>
        <div className='bg-pink-300 h-4 rounded-full transition-all duration-700 ease-in-out'
        style={{width :`${safeCompletion}%`}}>

        </div>
        </div>
      </div>
        <p className='text-gray-500 mt-2 text-sm'>
            completed the remaining details to unlock all CAMPBAG features.
          </p>
    </div>
  );
};

export default Profileheader;
