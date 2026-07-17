import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import ProductItems from "../components/ProductItems";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const TempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          TempData.push({
            _id: items,
            option: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(TempData);
  }, [cartItems]);


  if (cartData.length === 0) {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-semibold">Your Cart is Empty</h2>
     
    </div>
  );
}

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div className="flex flex-row gap-6">
        <div className="w-2/3">
          {cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id,
            );
            return (
            
              <div
                key={index}
                className="py-4  text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=" "
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                      {item.option != "default" && <p>Option: {item.option}</p>}
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <button onClick={()=>
                        item.quantity >1 && updateQuantity(
                          item._id,
                          item.option,
                          item.quantity-1
                        )
                      }
                      className="cursor-pointer">-</button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-15 text-center border"
                        onChange={(e)=>
                          e.target.value===''||e.target.value==='0'? null:updateQuantity(item._id,item.option,Number(e.target.value))
                        }
                      />


                      <button onClick={()=>
                        item.quantity<productData.quantity &&
                        updateQuantity(
                          item._id,
                          item.option,
                          item.quantity+1
                        )
                      } className="cursor-pointer">
                        
                        +</button>
                    </div>
                  </div>
                </div>
                <img onClick={() =>updateQuantity(item._id,item.option,0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
       <div className="w-1/3 sticky top-20 h-fit self-start">
         <CartTotal/>
         <div className="w-full text-end mt-8">
          <button onClick={()=> navigate('/place-order')} className="bg-black text-white text-sm mt-8 px-7 py-3 cursor-pointer">Proceed to checkout</button>
         </div>
       </div>
         
        
          

        

        {/* <div className="w-full lg:w-[350px] sticky top-20 h-fit">
          <p>Cart Total</p>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
