import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";


const ProductItems = ({id,images,name,price}) => {

    const {currency,wishlist,toggleWishlist}= useContext(ShopContext);

   const isWishlisted = wishlist.some(
    (item) => item.product && item.product._id === id
);
  return (
    <Link className=' text-gray-500 cursor-pointer' to={`/product/${id}`}>
       <div className="relative overflow-hidden">
  <img
    className="w-250 h-60 object-cover rounded-lg hover:scale-110 transition ease-in-out"
    src={images?.[0]?.url}
    alt={name}
  />

  <button
    onClick={(e) => {
      e.preventDefault();
      toggleWishlist(id);
    }}
    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
  >
    {isWishlisted ? (
      <FaHeart className="text-red-500 text-lg" />
    ) : (
      <FaRegHeart className="text-gray-600 text-lg" />
    )}
  </button>
</div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItems
