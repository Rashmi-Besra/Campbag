import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setimage] = useState("");
  const [options, setoptions] = useState("");
  const [quantity, setquantity] = useState(1);
  const [open, setOpen] = useState("");
  const dropdownRef = useRef(null);

  const fetchproductdata = () => {
    const item = products.find((item) => item._id === productId);

    if (item) {
      setProductData(item);
      setimage(item.image[0]);
    }
  };

  useEffect(() => {
    fetchproductdata();
  }, [productId, products]);

  return productData ? (
    <div className=" border-t-2 pt-19 transition-opacity ease-in  duration-500 opacity-100">
      {/*Product Data*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*Product image*/}
        <div className="flex-1  flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/*--------------------ProductInfo--------------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          {/* <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3.5" />
          <img src={assets.star_icon} alt="" className="w-3.5" />
          <img src={assets.star_icon} alt="" className="w-3.5" />
          <img src={assets.star_icon} alt="" className="w-3.5" />
          <img src={assets.star_dull_icon} alt="" className="w-3.5" />
          <p className='pl-2'>(122)</p>
        </div> */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          {/* <div className='flex flex-col gap-4 my-8'>
          <p>Size Available</p>
          <div className='flex gap-2'>
            {productData.sizes.map((item,index)=>(
              <button className={`border py-2 px-4 bg-gray-100`} key={index}>{item}</button>
            ))}
          </div>
          </div> */}

          {productData.options && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Options</p>
              <div className="flex gap-2">
                {productData.options.map((item, index) => (
                  <button
                    onClick={() => setoptions(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === options ? "border-orange-300" : ""}`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {productData.allowedquantity && (
            <div className="flex flex-row gap-4 my-10">
              <p>Quantity</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => quantity > 1 && setquantity(quantity - 1)}
                  className="border px-4 py-1 cursor-pointer"
                >
                  -
                </button>

                <span>{quantity}</span>
                <button
                  onClick={() =>
                    quantity < productData.quantity && setquantity(quantity + 1)
                  }
                  className="border px-4 py-1 cursor-pointer"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {productData.quantity} available
              </p>
            </div>
          )}

          <div className="my-8">
            <button
              onClick={() =>
                addToCart(productData._id, options , quantity)
              }
              className="bg-black text-white mx-18 w-64 px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Orginal Product</p>
              <p>Cash on delivery available</p>
              <p>Easy return policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------Description------------ */}
      <div className="flex items-start gap-20">
        <div className="w-2/3 ">
          <div className="flex">
            <p
              onClick={() =>
                setOpen(open === "description" ? "" : "description")
              }
              className=" px-5 py-3 text-md cursor-pointer"
            >
              Description
            </p>
          </div>
          {open === "description" && (
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm sm:w-3/5 text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum saepe, laudantium quod libero dolorum dolore.
                Distinctio voluptates earum ipsum. Quasi.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur molestias repudiandae minus quis sapiente eius ex
                eaque assumenda, ullam voluptates fugiat dolorum totam nobis,
                asperiores consectetur molestiae nemo optio voluptatum libero
                itaque sed incidunt facere! Ipsa, quod earum?
              </p>
            </div>
          )}
          <hr className="mt-2 sm:w-3/5" />
          <div className="flex">
            <p
              onClick={() => setOpen(open === "Material" ? "" : "Material")}
              className=" px-5 py-3 text-md cursor-pointer"
            >
              Material
            </p>
          </div>
          {open === "Material" && (
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 sm:w-3/5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum saepe, laudantium quod libero dolorum dolore.
                Distinctio voluptates earum ipsum. Quasi.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur molestias repudiandae minus quis sapiente eius ex
                eaque assumenda, ullam voluptates fugiat dolorum totam nobis,
                asperiores consectetur molestiae nemo optio voluptatum libero
                itaque sed incidunt facere! Ipsa, quod earum?
              </p>
            </div>
          )}
          <hr className="mt-2 sm:w-3/5" />
          <div className="flex">
            <p
              onClick={() => setOpen(open === "Delivery" ? "" : "Delivery")}
              className=" px-5 py-3 text-md cursor-pointer"
            >
              Delivery and Payment
            </p>
          </div>
          {open === "Delivery" && (
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm sm:w-3/5 text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum saepe, laudantium quod libero dolorum dolore.
                Distinctio voluptates earum ipsum. Quasi.
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur molestias repudiandae minus quis sapiente eius ex
                eaque assumenda, ullam voluptates fugiat dolorum totam nobis,
                asperiores consectetur molestiae nemo optio voluptatum libero
                itaque sed incidunt facere! Ipsa, quod earum?
              </p>
            </div>
          )}
          <hr className="mt-2 sm:w-3/5" />
        </div>
        <div>Contact</div>
      </div>

      {/*------------------------Related Product---------------------------------------------*/}
      <RelatedProducts
        Category={productData.Category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
