import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount}=useContext(ShopContext)
    
    const totalfee=getCartAmount();
    
  return (
   <div className="w-full lg:w-[350px]">
      
          <div className='text-2xl'>
            <Title text1={'Cart'} text2={'Total'}/>
          </div>
        
          <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency} {totalfee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Total</p>
              <b>{currency}{totalfee === 0?0 : totalfee+delivery_fee}.00</b>
            </div>
          </div>
        </div>
  )
}

export default CartTotal
