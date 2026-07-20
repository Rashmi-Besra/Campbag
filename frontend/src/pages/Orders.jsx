import React,{useContext} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

  const { orders,currency}=useContext(ShopContext);
  console.log("Orders =", orders);
console.log("Type =", typeof orders);

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'}/>
      </div>

      <div>
        {orders.length===0 ?(
          <div className='py-10 text-center text-gray-500'> No orders yet</div>
        ):
        orders.map((order,orderIndex)=>(
          <div key={order.id ||  orderIndex}>
            {order.items.map((item,itemIndex) =>(
              <div key={itemIndex}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img  className='w-16 sm:w-20' src={item.images?.[0]?.url} alt={item.name} />

                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>

                    <div className='flex items-center gap-3 mt-2 text-base'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity:{item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-2'>
                      Date:
                      <span className='text-gray-500 ml-2'>
                        {new Date(order.date).toDateString()}
                      </span>
                    </p>
                  </div>
                 
                </div>
                 <div className=' flex items-center gap-60'>
                  <div className='flex items-center gap-5'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>Ready to ship</p>
                    
                  </div>
                  <button className='border px-2 py-0.5 text-sm font-medium rounded-sm cursor-pointer '>Track Order</button>
                  </div>
                

              </div>
            ))}

          </div>
        ))
      }
        
      </div>
      
    </div>
  )
}

export default Orders
