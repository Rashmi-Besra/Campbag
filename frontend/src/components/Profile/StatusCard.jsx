import React from 'react'

const StatusCard = ({
  title,
  value,
  status="success",
}) => {
  const statusStyles={
    success:{
      bg:"bg-green-100",
      text:"text-green-700",
    },

    warning:{
      bg:"bg-yellow-100",
      text:"text-yellow-700",
    },

    danger:{
      bg:"bg-red-100",
      text:"text-red-700",
    },
    info:{
      bg:"bg-blue-100",
      text:"text-blue-700",
    },
  };

  const currentStyle=
  statusStyles[status] || statusStyles.info;
  return (
    <div className='flex items-center justify-between py-3'>
      <h4 className='text-gray-700 font-medium'>
        {title}
      </h4>
      <span className={`px-3 py-1 rounded-full
        text-sm font-semibold ${currentStyle.bg}
        ${currentStyle.text}`}>
          {value}
      </span>
    </div>
  )
}

export default StatusCard
