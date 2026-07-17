import React,{useState,useContext} from 'react';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';


const Placeorder = () => {

  const [method,setmethod]=useState('cod');
  const {navigate,placeOrder}=useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/*---------------left side--------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'My'} text2={'Information'}/>
        </div>
         <p className='required'>First Name</p>
        <div className='flex gap-3'>         
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='First name' />
        </div>
        <p>Last Name</p>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Last name' />
        </div>
        <p>Registration Number</p>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Registration number' />
        </div>
        <p>College Email</p>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Email Address' />
        </div>
         <p>Personal Email</p>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Email Address' />
        </div>
         <p>Address</p>
         <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Flat no/Building' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='Street/Locality' />
        </div>
         <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="number" placeholder='Pincode' />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="text" placeholder='State' />
        </div>
        <p>Phone Number</p>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full cursor-pointer' type="number" placeholder=' ' />
        </div>       
      </div>
      {/*--------------------Right Side--------------------------- */}
       <div className='w-full lg:w-[500px] sticky top-20 h-fit '>
          <div className='flex justify-center mt-12'>
            <CartTotal/>
          </div>
          <div className='mt-12'>
            <Title text1={'Payment'} text2={'Method'}/>
            <div className='flex justify-center gap-3 flex-col lg:flex-row'>
              <div onClick={()=>setmethod('stripe')}className='flex items-center border  px-4 cursor-pointer'>
                <p className={`min-w-3 h-3 border rounded-full ${method === 'stripe' ? "bg-black" : ''} `}> </p>
                <img className='h-4 mx-4' src={assets.stripe_logo} alt="" />
                </div>

                <div  onClick={()=>setmethod('razorpay')}className='flex items-center  border px-4 cursor-pointer'>
                  <p className={`min-w-3 h-3 border rounded-full ${method=== 'razorpay' ? "bg-black" : ''}`}></p>
                  <img className='h-4 mx-4' src={assets.razorpay_logo} alt="" />
                </div>
                 <div onClick={()=>setmethod('cod')}className='flex items-center border px-4 cursor-pointer whitespace-nowrap'>
                  <p className={`min-w-3 h-3 border rounded-full ${method=== 'cod' ? "bg-black" : ''}`}></p>
                  <p className='text-gray-500 text-sm font-light ml-4 '>Cash on delivery</p>
                 </div>
              </div>
              <div className='w-full flex justify-center mt-8'>
                <button onClick={()=> {placeOrder(); navigate('/orders')}}className='bg-black text-white px-16 py-2 text-sm whitespace-nowrap cursor-pointer'>
                  Place Order
                </button>

              </div>
            
            </div>

          </div>
        </div>
    
  )
}

export default Placeorder
