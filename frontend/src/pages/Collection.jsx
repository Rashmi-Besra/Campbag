
import React,
{
  useContext,
  useEffect,
  useState
}
from 'react'

import { ShopContext } from '../context/ShopContext'

import { useParams } from 'react-router-dom'

import ProductItems from '../components/ProductItems'

import Title from '../components/Title'

import FilterSidebar from '../components/FilterSidebar'

import { assets } from '../assets/assets'

const Collection = () => {



  /*
  ==========================================
  GET ALL PRODUCTS
  ==========================================
  */

  const { products,search,showSearch } = useContext(ShopContext)



  /*
  ==========================================
  GET URL PARAMETERS
  ==========================================

  Example URL:

  /collection/men/clothings

  category = "men"

  subCategory = "clothings"

  ==========================================
  */

  const {
    category,
    subCategory
  } = useParams()



  /*
  ==========================================
  STATE VARIABLES
  ==========================================
  */

  // final products shown on screen
  const [filteredProducts, setFilteredProducts] = useState([])

  // controls filter sidebar visibility
  const [filterVisible, setFilterVisible] = useState(false)

  // selected color filters
  const [selectedColors, setSelectedColors] = useState([])

  // selected sorting type
  const [sortType, setsortType] = useState("relevant")



  /*
  ==========================================
  HANDLE COLOR FILTER
  ==========================================
  */




  const toggleColor = (color) => {

    // if already selected remove it
    if (selectedColors.includes(color)) {

      setSelectedColors(prev =>

        prev.filter(item => item !== color)

      )

    }

    // otherwise add it
    else {

      setSelectedColors(prev =>

        [...prev, color]

      )

    }

  }



  /*
  ==========================================
  MAIN FILTERING LOGIC
  ==========================================
  */

  useEffect(() => {

    /*
    ----------------------------------------
    STEP 1
    COPY PRODUCTS
    ----------------------------------------
    */

    let productsCopy = [...products]

console.log("URL Category:", category)
console.log("URL SubCategory:", subCategory)

console.log(
  products.map(product => ({
    category: product.category,
    subCategory: product.subCategory
  }))
)
    /*
    ----------------------------------------
    STEP 2
    FILTER CATEGORY + SUBCATEGORY
    ----------------------------------------
    */

  if (category) {
  productsCopy = productsCopy.filter(
    product =>
      product.category?.toLowerCase().trim() === category.toLowerCase().trim()
  );
}

if (subCategory) {
  productsCopy = productsCopy.filter(
    product =>
      product.subCategory?.toLowerCase().trim() === subCategory.toLowerCase().trim()
  );
}


    /*
    ----------------------------------------
    STEP 3
    FILTER COLORS
    ----------------------------------------
    */

    if (selectedColors.length > 0) {

      productsCopy = productsCopy.filter(product =>

        selectedColors.includes(
          product.color.toLowerCase()
        )

      )

    }



    /*
    ----------------------------------------
    STEP 4
    SORT PRODUCTS
    ----------------------------------------
    */

    if (sortType === "Low-High") {

      productsCopy.sort(
        (a, b) => a.price - b.price
      )

    }

    else if (sortType === "High-Low") {

      productsCopy.sort(
        (a, b) => b.price - a.price
      )

    }



    /*
    ----------------------------------------
    STEP 5
    UPDATE FINAL PRODUCTS
    ----------------------------------------
    */

    setFilteredProducts(productsCopy)

  },

    [
      products,
      category,
      subCategory,
      selectedColors,
      sortType
    ]

  )



  return (

    <div className='pt-10 border-t'>



      {/* ===================================
          TOP SECTION
      =================================== */}

      <div className='flex justify-between items-center mb-8'>

       <Title
          text1={category}
          text2={subCategory}
        />

    


        {/* FILTER BUTTON */}

        <button

          onClick={() =>
            setFilterVisible(true)
          }

          className='border px-4 py-2 text-sm'
        >

          FILTERS

        </button>

      </div>



      {/* ===================================
          PRODUCTS GRID
      =================================== */}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

        {

          filteredProducts.map((item) => (

            <ProductItems

              key={item._id}

              id={item._id}

              image={item.images}

              name={item.name}

              price={item.price}

            />

          ))

        }

      </div>



      {/* ===================================
          FILTER SIDEBAR
      =================================== */}

      <FilterSidebar

        filterVisible={filterVisible}

        setFilterVisible={setFilterVisible}

        selectedColors={selectedColors}

        toggleColor={toggleColor}

        sortType={sortType}

        setsortType={setsortType}

      />

    </div>

  )

}

export default Collection

