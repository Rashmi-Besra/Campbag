import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "../components/ProductItems";
import Title from "../components/Title";

const Wishlist = () => {
  const { wishlist, fetchWishlist } = useContext(ShopContext);

  useEffect(() => {
    console.log("Wishlist page loaded");
    fetchWishlist();
   
  }, []);
   console.log("Wishlist:", wishlist);

  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"WISHLIST"} />
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-xl">Your wishlist is empty ❤️</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {wishlist.map(({ product }) => (
  <ProductItems
    key={product._id}
    id={product._id}
    images={product.images}
    name={product.name}
    price={product.price}
  />
))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;