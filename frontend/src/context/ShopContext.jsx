import { createContext,useState, useEffect, } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist
} from "../services/wishlistService";

import {
    getCart,
    addToCart as addToCartAPI,
    updateCart as updateCartAPI,
    clearCart
} from "../services/cartService";

export const ShopContext=createContext();

const ShopContextProvider=(props)=>{

    const currency='₹';
    const delivery_fee=10;
    const [cartItems,setcartItems]=useState({});
    const[orders,setOrders]=useState([]);
    const navigate=useNavigate();
    const[search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false); 
    const [wishlist,setWishlist]=useState([]);
    const [products,setProducts]=useState([]);

    const [token, setToken] = useState(localStorage.getItem("token"));


const addToCart = async (ItemId, options, quantity) => {
    try {

        const optionKey = options || "default";

        await addToCartAPI(ItemId, optionKey, quantity);

        await fetchCart();

        toast.success("Added to cart");

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Failed to add item"
        );

    }
};

    const getCartCount=()=>{
        let Totalcount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        Totalcount+=cartItems[items][item];

                    }
                } catch (error) {
                    console.log(error.message);
                    
                }
            }
        }
        return Totalcount;
    }

  const updateQuantity = async (ItemId, option, quantity) => {
    try {

        await updateCartAPI(
            ItemId,
            option,
            quantity
        );

        await fetchCart();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Unable to update cart"
        );

    }
};
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
                console.log(error.message);
                
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
                image: productInfo.images?.[0]?.url,
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

 const fetchProducts = async () => {

    try {

        const response = await api.get("/product");

        if(response.data.success){

            setProducts(response.data.products);

        }

    }
    catch(error){

        console.log(error.message);

    }

}

const fetchCart = async () => {
    try {

        const response = await getCart();

        if (response.success) {

            const backendCart = {};

            response.cart.items.forEach((item) => {

                if (!backendCart[item.product._id]) {
                    backendCart[item.product._id] = {};
                }

                backendCart[item.product._id][item.option] =
                    item.quantity;

            });

            setcartItems(backendCart);

        }

    } catch (error) {

        console.log(error);

    }
};

const fetchWishlist = async () => {
  try {
    const response = await getWishlist();

    if (response.success) {
      if (response.wishlist && response.wishlist.products) {
        setWishlist(response.wishlist.products);
      } else {
        setWishlist([]);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const toggleWishlist = async (productId) => {
  try {
    // Check if product already exists in wishlist
    const exists = wishlist.some(
      (item) => item.product._id === productId
    );

    if (exists) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }

    // Refresh wishlist after update
    await fetchWishlist();

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {

    fetchProducts();

    if (token) {

        fetchWishlist();

        fetchCart();

    }

}, [token]);

    const value={
        products,currency,delivery_fee,
        cartItems,addToCart,
        getCartCount,
        updateQuantity,getCartAmount,
        navigate,placeOrder,
        orders,setOrders,search,
        setSearch,showSearch,setShowSearch,
        wishlist,setWishlist,fetchWishlist,
        toggleWishlist
       
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;