import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'

const Popular= () => {

    // Getting all products from global context
    const { products } = useContext(ShopContext)

    // State to store sorted popular products
    const [popularProducts, setPopularProducts] = useState([])

    useEffect(() => {

        // Create a copy of products and sort by views
        const sortedProducts = [...products]
            .sort((a, b) => b.views - a.views)  // highest views first
            .slice(0, 10) // take top 10 products

        setPopularProducts(sortedProducts)

    }, [products])


    return (
        <div className='my-10'>

            {/* Section Title */}
            <div className='text-center py-8 text-3xl'>
                <Title text1={'POPULAR'} text2={'ON CAMPUS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-[#16476A]'>
                    Items students are checking out the most right now.
                </p>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

                {popularProducts.map((item, index) => (
                    <ProductItems
                        key={index}
                        id={item._id}
                        images={item.images}
                        name={item.name}
                        price={item.price}
                    />
                ))}

            </div>

        </div>
    )
}

export default Popular