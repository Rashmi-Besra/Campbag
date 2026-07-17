import React from 'react'
import { FiCheckCircle,FiCircle } from 'react-icons/fi'
const Remaindercard = ({profile}) => {

  const remainder=[
    {
    title: "upload Profile Photo",
    completed: !! profile?.profileImage,
    },
    {
      title: "Add Personal Email",
      completed: !!profile?.personalEmail,
    },
    {
      title: "Add Phone Number",
      completed: !!profile?.phone,
    },
    {
      title: "Apply for seller verification",
      completed: profile?.sellerStatus==="Verified",
    },
  ];
  return (
    <div className='bg-white rounded-2xl shadow-md border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-5'> 
        Complete these Steps
      </h2>

      <div className='space-y-4'>
        {remainder.map((item,index)=>(
          <div 
          key={index}
          className='flex items-center gap-3'>
            {item.completed?(
              <FiCheckCircle className='text-green-500 text-l'/>
            ):(
              <FiCircle className=' text-gray-400 text-xl'/>
            )}
            <span className={`${
              item.completed
              ? "text-gray-500 line-through"
              : "text-gray-800"
            }`}>
              {item.title}
            </span>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Remaindercard
