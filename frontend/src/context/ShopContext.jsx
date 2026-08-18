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

import {
    placeOrder as placeOrderAPI,
    getOrders as getOrdersAPI
} from "../services/orderService";

import {
    getDashboard as getSellerDashboard,
    
   
    
    deleteProduct as deleteProductAPI
} from "../services/sellerService";


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
    const [sellerStats, setSellerStats] = useState(null);
    const [sellerOrders, setSellerOrders] = useState([]);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
);

    const [token, setToken] = useState(localStorage.getItem("token"));


const addToCart = async (ItemId, options, quantity) => {
    try {

        const optionKey = options || "default";

        await addToCartAPI(ItemId, optionKey, quantity);

        await fetchCart();

        toast.success("Added to cart");

    } catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.data);

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



const placeOrder = async (orderData) => {

    try {

        const response = await placeOrderAPI(orderData);

        if (response.success) {

            toast.success(response.message);

            await fetchOrders();

            await fetchCart();

            navigate("/orders");

        }

    } catch (error) {

    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    toast.error(
        error.response?.data?.message || "Order failed"
    );

}

};
    
const filteredProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
        return true;
    }

    return (
        product.name?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.subCategory?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.branch?.toLowerCase().includes(searchTerm)
    );
});




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

const fetchOrders = async () => {

    try {

        const response = await getOrdersAPI();

        if (response.success) {

            setOrders(response.orders);

        }

    } catch (error) {

        console.log(error);

    }

};

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


const fetchSellerDashboard = async () => {
    try {
        const response = await getSellerDashboard();

        if (response.success) {
            setSellerStats(response.stats);
        }

    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Failed to load dashboard"
        );
    }
};

const fetchSellerOrders = async () => {
    try {
        const response = await getSellerOrdersAPI();

        if (response.success) {
            setSellerOrders(response.orders);
        }

    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Failed to load orders"
        );
    }
};

const updateOrderItemStatus = async (orderId, itemId, status) => {
    try {

        const response = await updateOrderItemStatusAPI(orderId, itemId, status);

        if (response.success) {
            toast.success(response.message);
            await fetchSellerOrders();
        }

    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Failed to update status"
        );
    }
};

const fetchMyProducts = async () => {
    try {
        const response = await getMyProductsAPI();

        if (response.success) {
            setSellerProducts(response.products);
        }

    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Failed to load products"
        );
    }
};



const deleteMyProduct = async (productId) => {
    try {

        const response = await deleteProductAPI(productId);

        if (response.success) {
            toast.success(response.message);
            await fetchMyProducts();
        }

    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Failed to delete product"
        );
    }
};


useEffect(() => {

    fetchProducts();

    if (token) {

        fetchWishlist();

        fetchCart();

        fetchOrders();

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
        toggleWishlist,
        sellerStats, sellerOrders, sellerProducts,
        fetchSellerDashboard, fetchSellerOrders,
        updateOrderItemStatus, fetchMyProducts, deleteMyProduct,
        user,setUser,fetchProducts
    }
       
    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};


export default ShopContextProvider;