import React,{useState} from 'react'

const Login = () => {
const[Currentstate,setCurrentstate]=useState('Sign Up');

const onSubmitHandler=async(event)=>{
  event.preventDefault();

}
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{Currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {Currentstate === 'Login'? '':<input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required/> && 
       <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Email'required/> }
      <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Registration Number'required/>
      <input className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Password' required/>

      <div className='w-full flex justify-center  cursor-pointer text-sm mt-[-8px'>
        <p>Forgot your Password? </p>
            
      </div>
       <div>
           {
          Currentstate=== 'Login'
          ?<p  onClick={()=>setCurrentstate('Sign Up')}className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentstate('Login')}className='cursor-pointer justify-end'>Login Here</p> 
        }
        </div>
        <button className='bg-black text-white cursor-pointer font-light px-8 py-2 mt-4'>{Currentstate === 'Login' ?'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
