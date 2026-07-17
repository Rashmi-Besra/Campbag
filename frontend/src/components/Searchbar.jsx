import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const Searchbar = () => {
    const{search,setSearch,showSearch,setShowSearch}=useContext(ShopContext);
    console.log("show search:", showSearch);
    
    if(!showSearch) return null;
    
  return (
    <div className='bg-gray-100 py-4'>
        <div className='max-w-4xl mx-auto '>
            <input type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search books,electronics..'
            className='w-full border rounded-full px-6 py-3' />
        </div>
      
    </div>
  )
}

export default Searchbar
