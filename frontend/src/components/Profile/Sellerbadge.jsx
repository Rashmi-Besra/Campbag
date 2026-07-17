import React from 'react'
import { FiAward } from 'react-icons/fi'

const Sellerbadge = ({sellerStatus="Pending"}) => {
  const statusConfig={
    Pending:{
      badgeColor: "bg-yellow-100 text-yelow-700",
      title: "Pending verification",
      description: "Become a verified seller to increase buyer trust and unlock more selling features.",
    },

    Verified:{
      badgeColor: "bg-green-100 text-green-700",
      title: "Verified Seller",
      description: 
      "Your seller account has been verified. Buyers can shop from you with confidence.",
    },

    Rejected: {
      badgeColor: "bg-red-100 text-red-700",
      title:"Verification Rejected",
      description: 
      "Please review your submitted details and apply again.",
    },
  };

  const currentStatus=
  statusConfig[sellerStatus] || statusConfig.Pending;
  return (
    <div className='bg-white rounded-2xl shadow-md border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-5'>
        Seller Badge
      </h2>

      <div className='flex flex-col items-center text-center'>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${currentStatus.badgeColor}`}>
          <FiAward className='text-3xl'/>
        </div>

        <h3 className='mt-4text-lg font-semibold text-gray-800'>
          {currentStatus.title}
        </h3>
        <p className='mt-2 text-gray-500'>
          {currentStatus.description}
        </p>

        {sellerStatus === "Pending" && (
          <button className='mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition'>
            Appy Now
          </button>
        )}

      </div>
    </div>
  )
}

export default Sellerbadge
