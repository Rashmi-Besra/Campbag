import React,{useState} from 'react'

import Title from "../components/Title";
import { assets } from '../assets/assets';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn
} from "react-icons/fa";



const About = () => {

  const[open,setOpen]=useState("")

  const timelineData = [
  {
    number: "01",
    title: "Student Verification",
    description: "Register using your college email.",
    color: "#fca5a5"
  },
  {
    number: "02",
    title: "List Product",
    description: "Upload books, electronics and more.",
    color: "#93c5fd"
  },
  {
    number: "03",
    title: "Find Buyer",
    description: "Connect with interested students.",
    color: "#fdba74"
  },
  {
    number: "04",
    title: "Exchange",
    description: "Complete the transaction safely.",
    color: "#86efac"
  }
];
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
       <h1 className='text-4xl font-Times New Roman font-Semiboldi '>ABOUT US</h1>
        <div className='my-10 flex flex-col md:flex-row gap-20 '>
          <img className='w-full flex md:w-[550px] -translate-x-1/10' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, suscipit voluptatum? Voluptates perferendis rerum sed obcaecati neque doloremque, ea maiores, aspernatur quasi porro modi laborum omnis, aliquid facere tempore. Dolore iste corporis repudiandae vero!</p>
          </div>
        </div>
        {/* <div className='justify-center gap-10 py-5  text-gray-600 text-md'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptatibus, repudiandae debitis repellendus architecto rerum?</p>
        </div> */}
          <div className=' py-20 bg-white/80 p-6 w-full'>
          <h1 className='w-full text-3xl font-bold mb-4'>Our Mission</h1>
          <h2 className='w-full text-2xl mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum?</h2>
          <h2 className='w-full text-2xl mb-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum?</h2>


          {/* <p className='w-full text-justify leading-relaxed '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus est fuga atque vitae animi esse architecto ipsa. Ea porro ad laudantium numquam sapiente ducimus atque quis. Enim illo provident molestias.</p> */}
          </div>
        <div className='my-8 relative w-full'>
          <div className='flex justify-end'>
          <img className='w-full md:w-[480px] 'src={assets.Campus} alt="" />
          </div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-6 w-[800px] '>
          <h2 className='w-full text-2xl font-bold mb-4'>Lorem ipsum dolor sit amet.</h2>
          <p className='w-full text-justify leading-relaxed '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus est fuga atque vitae animi esse architecto ipsa. Ea porro ad laudantium numquam sapiente ducimus atque quis. Enim illo provident molestias.</p>
          </div>
        </div>

        <div className='grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 my-20 '>
          <div >
            <img className='w-500px h-89'src={assets.buyandsell} alt="" />
               <h2 className='my-3 underline'>Buy and Sell </h2> 
                  
               <p className='px-2 py-3 text-sm text-gray-700'>  Find affordable products from fellow students.</p>           
          </div>
          <div>
            
            <img className='w-500px h-89' src={assets.sustainability} alt="" />
            <h2 className='my-3 underline'>Sustainability</h2>
            <p className='px-2 py-3 text-sm text-gray-700'>  Promote reuse and reduce waste.</p>
          </div>
          <div>
            <img className='w-500px h-89'  src={assets.Community} alt="" />
            <h2 className='my-3 underline'> Verified Community</h2>
            <p className='px-2 py-3 text-sm text-gray-700'>Only college students can access the platform.</p>
          </div>
            <div>
            <img className='w-500px h-89' src={assets.communication} alt="" />
            <h2 className='my-3 underline'>Easy to Communicate</h2>
            <p className='px-2 py-3 text-sm text-gray-700'>Connect directly with buyers and sellers.</p>
          </div>
            
        </div>
        <h1 className='text-3xl'>How it works</h1>
        <div className="flex justify-between items-center  gap-4 my-12">
          

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
  {timelineData.map((step, index) => (
    <div key={index} className="flex flex-col items-center">
      {/* Circle Graphic */}
      <div className="relative w-60 h-60">

        <svg
          className="absolute inset-0"
          viewBox="0 0 240 240"
        >
          <circle
            cx="120"
            cy="120"
            r="90"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
          />

          <path
            d="M40 120 A80 80 0 1 0 200 120"
            fill="none"
            stroke={step.color}
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold"
          style={{ backgroundColor: step.color }}
        >
          {step.number}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h3
            className="font-bold text-base mb-3"
            style={{ color: step.color }}
          >
            {step.title}
          </h3>
          
            <p className="text-center text-gray-600 text-xs text-pretty">
            {step.description}
          </p>
          
          
        </div>
      </div>

     
    </div>
  ))}
</div>


      </div>
      <div className='w-full my-18 relative w-screen left-1/2 -translate-x-1/2 '>
        <div className='flex justify-center '>
           <img className=' w-full h-150 object-cover' src={assets.team} alt="" />
        </div>
        <div className='absolute top-4/5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 w-200px cursor-pointer
        '>
         <p className='w-full underline text-md text-black font-bold mb-2'>Our Team</p>

        </div>
       
      </div>
      <div className='flex flex-cols w-full  h-50'>
        <div className=' w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <p className='text-3xl text-black'>Contact us:</p>
        </div>

        <div className='w-full md:w-1/2  flex flex-col  indent-left justify-center py-10 sm:py-0'>
          <p className='text-base text-gray-600 text-justify gap-2'>Email: campusbag@gmail.com</p>
          <p className='text-base text-gray-600 text-justify gap-2 '>Contact no: xx xxx xxxxx</p>
        </div>
      </div>

      <div className="flex justify-center my-4 gap-8 text-4xl text-gray-400">
        <p className='text-base text-black flex items-center'>Follow us:</p>
  <a href="#"><FaInstagram /></a>
  <a href="#"><FaFacebookF /></a>
  <a href="#"><FaTwitter /></a>
  <a href="#"><FaLinkedinIn /></a>
</div>

<div className='flex flex-col gap-2 my-16'>
  <p className='text-black 
   text-4xl'>FAQ</p>
   <div className='flex gap-20'>
    <div className='flex flex-col'>
    <div className='flex'>
      <p onClick={()=>
        setOpen(open=== "firstqna"? "": "firstqna")
      } 
      className='px-5 py-3 fle items-start text-sm cursor-pointer'
      >
        1.Lorem ipsum, dolor sit amet consectetur adipisicing?

      </p>
      </div> 
      {open=== "firstqna" &&(
        <div className='flex flex-col gap-4 bg-gray-300 px-5 py-2 text-sm  text-black-600'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem consequuntur ea commodi voluptas voluptates earum voluptatum architecto nesciunt debitis.
          </p>
          </div>
      )}
     
      <div className='flex'>
        <p onClick={()=>
          setOpen(open==="secondqna"?"":"secondqna")
        } className='px-5 py-3 text-sm cursor-pointer'>
          2.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, temporibus!

        </p>
      </div>
      {open === "secondqna" && (
        <div className='flex flex-col gap-4 bg-gray-300 px-5 py-2 text-sm text-black-600 '>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus aspernatur neque suscipit, enim officia sapiente! Totam tempora adipisci ad assumenda.
          </p>

        </div>
      )}

         <div className='flex'>
        <p onClick={()=>
          setOpen(open==="thirdqna"?"":"thirdqna")
        } className='px-5 py-3 text-sm cursor-pointer'>
          3.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, temporibus!

        </p>
      </div>
      {open === "thirdqna" && (
        <div className='flex flex-col gap-4 bg-gray-300 px-5 py-2 text-sm text-black-600 '>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus aspernatur neque suscipit, enim officia sapiente! Totam tempora adipisci ad assumenda.
          </p>

        </div>
      )}
         <div className='flex'>
        <p onClick={()=>
          setOpen(open==="fourthqna"?"":"fourthqna")
        } className='px-5 py-3 text-sm cursor-pointer'>
          4.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, temporibus!

        </p>
      </div>
      {open === "fourthqna" && (
        <div className='flex flex-col gap-4 bg-gray-300 px-5 py-2 text-sm text-black-600 '>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus aspernatur neque suscipit, enim officia sapiente! Totam tempora adipisci ad assumenda.
          </p>

        </div>
      )}
         <div className='flex'>
        <p onClick={()=>
          setOpen(open==="fifthqna"?"":"fifthqna")
        } className='px-5 py-3 text-sm cursor-pointer'>
          5.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, temporibus!

        </p>
      </div>
      {open === "fifthqna" && (
        <div className='flex flex-col gap-4 bg-gray-300 px-5 py-2 text-sm text-black-600 '>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus aspernatur neque suscipit, enim officia sapiente! Totam tempora adipisci ad assumenda.
          </p>

        </div>
      )}
     
    </div>
   </div>

</div>
     
      </div>
      
    </div>
  )
}

export default About
