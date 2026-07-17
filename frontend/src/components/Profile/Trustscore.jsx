import React from 'react';
import {FiShield} from "react-icons/fi";

const Trustscore = ({trustscore=0}) => {
  const getScore=()=>{
    if(trustscore>=80){
      return {
        label: "Excellent Reputation",
        color: "text-green-600",
        bg:"bg-green-100",
      };
    }

    if(trustscore>=60){
      return{
        label: "Good Reputation",
      color: "text-blue-600",
      bg: "bg-blue-100",
      };      
    }

    if(trustscore>=40){
      return{
        label:"Average Reputation",
        color: "text-yellow-600",
        bg:"bg-yellow-100",
      };
    }

    return {
      label:"New User",
      color:"text-red-600",
      bg:"bg-red-100",
    };
  };

  const scoreInfo=getScore();
  
  return (
    <div className='bg-white p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-6'>
        Trust Score
      </h2>
      <div className='flex flex-col items-center'>
        {/*Score circle */}

        <div className={`w-24 h-24 rounded-fulll items-cenetr justify-center ${scoreInfo.bg}`}>
          <FiShield className={`text-5xl ${scoreInfo.color}`}/>

        </div>
        {/*Score  */}

        <h1 className='text-4xl font-bold text-gray-800 mt-5'>
          {trustscore}
          <span className='text-xl text-gray-500'>/100</span>

        </h1>
        {/*Reputation */}
        <p className={`mt-3 font-semibold ${scoreInfo.color}`}>
          {scoreInfo.label}
        </p>

      </div>
    </div>
  )
}

export default Trustscore
