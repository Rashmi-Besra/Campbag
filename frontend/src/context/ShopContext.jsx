import { createContext,useState, useEffect, } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency='₹';
    const delivery_fee=10;
    const [cartItems,setcartItems]=useState({});
    const[orders,setOrders]=useState([]);
    const navigate=useNavigate();
    const[search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false); 
   
    const addToCart=async (ItemId,options,quantity)=>{
         let cartData=structuredClone(cartItems);
        const pro=products.find(item =>item._id === ItemId);
                 
        if(pro.options && !options){
            toast.error('Select Product Options');
            return
        }
        console.log("Product:", pro);
        console.log("Selected option:", options);

         const optionkey=options|| "default";
        if (cartData[ItemId] && typeof cartData[ItemId]==="object") {
           
            if(cartData[ItemId][optionkey]){
                const newQuantity=cartData[ItemId][optionkey]+quantity;
               if(newQuantity>pro.quantity){
                toast.error(`Only ${pro.quantity} items available`);
                return;
               }
                cartData[ItemId][optionkey]=newQuantity;
            }
            else{
               if(quantity >pro.quantity){
                toast.error(`Only ${pro.quantity} items available`);
                return;
               }
               cartData[ItemId][optionkey]=quantity;
            }
        }
        else{
          if(quantity>pro.quantity){
            toast.error(`Only ${pro.quantity} items available`);
            return;
          }
          cartData[ItemId]={};
          cartData[ItemId][optionkey]=quantity;
        }
        setcartItems(cartData);
    }

    const getCartCount=()=>{
        let Totalcount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        Totalcount+=cartItems[items][item];

                    }
                } catch (error) {
                    
                }
            }
        }
        return Totalcount;
    }

    const updateQuantity = (ItemId, option, quantity) => {
   let cartData = structuredClone(cartItems);

   cartData[ItemId][option] = quantity;

   setcartItems(cartData);
}

const getCartAmount=()=>{
    let totalAmount=0;
    for(const items in cartItems){
        let itemInfo=products.find((product)=>product._id===items);
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item]>0){;
                    totalAmount+=itemInfo.price*cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalAmount;
}

 useEffect(()=>{
        const savedOrders=
        JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    },[])

 const placeOrder=()=>{
    let orderItems=[];
    for(const productId in cartItems){
        const productInfo=
        products.find(
            item=>item._id ===productId
        );
        for (const size in cartItems[productId]){
            orderItems.push({
                _id:productId,
                name: productInfo.name,
                image: productInfo.image[0],
                price: productInfo.price,
                quantity: cartItems[productId][size],
                size:size

            });
        }
    }
    

    const orderData={
        id: Date.now(),
        items: orderItems,
        amount:getCartAmount(),
        status: "Order Placed",
        date: new Date()
    }

    const updateOrders= [...orders, orderData];
    setOrders(updateOrders);
    
    localStorage.setItem(
        "orders",
        JSON.stringify(updateOrders)
    );
    console.log(orderData);
    setcartItems({});
   
 }



    const value={
        products,currency,delivery_fee,
        cartItems,addToCart,
        getCartCount,
        updateQuantity,getCartAmount,
        navigate,placeOrder,
        orders,setOrders,search,
        setSearch,showSearch,setShowSearch
       
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;