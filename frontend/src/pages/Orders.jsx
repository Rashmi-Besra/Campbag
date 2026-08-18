import React,{useContext} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from "react-toastify";
import { cancelOrder } from "../services/orderService";
const Orders = () => {

  const { orders,currency,fetchOrders}=useContext(ShopContext);
  console.log("Orders =", orders);
console.log("Type =", typeof orders);
const handleCancel = async (orderId) => {

    try {

        const response = await cancelOrder(orderId);

        if (response.success) {

            toast.success(response.message);

            fetchOrders();

        }

    } catch (error) {

        toast.error(
            error.response?.data?.message
        );

    }

};
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
          <div key={order._id ||  orderIndex}>
            {order.items.map((item,itemIndex) =>(
              <div key={itemIndex}
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img  className='w-16 sm:w-20' src={item.product.images?.[0]?.url} alt={item.product.name} />

                  <div>
                    <p className='sm:text-base font-medium'>{item.product.name}</p>

                    <div className='flex items-center gap-3 mt-2 text-base'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity:{item.quantity}</p>
                      <p>Option: {item.option}</p>
                    </div>
                    <p className='mt-2'>
                      Date:
                      <span className='text-gray-500 ml-2'>
                        {new Date(order.createdAt).toDateString()}
                      </span>
                    </p>
                  </div>
                 
                </div>
                 <div className=' flex items-center gap-60'>
                  <div className='flex items-center gap-5'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{order.orderStatus}</p>
                    
                  </div>
                  <button className='border px-2 py-0.5 text-sm font-medium rounded-sm cursor-pointer '>Track Order</button>
        {order.orderStatus === "Cancelled" ? (
    <button
        disabled
        className="px-4 py-2 bg-gray-300 text-gray-600 rounded"
    >
        Cancelled
    </button>
) : (
    <button
        onClick={() => handleCancelOrder(order._id)}
        className="px-4 py-2 bg-red-500 text-white rounded"
    >
        Cancel Order
    </button>
)}      </div>
                

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
