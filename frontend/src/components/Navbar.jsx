import React, { useState, useEffect,useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import Profiledropdown from './Profiledropdown'
import SidebarMenu from './SidebarMenu'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const [submenu, setSubmenu] = useState(null)
  const {setShowSearch,getCartCount}=useContext(ShopContext);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [visible])

  const subCategories = {
    Men:["Clothings","Footwears","Watches&wearables","Fragnaces","Skincare","Bags"],
    Women:["Clothings","Jewellery","Footwears","Fragnances & makeup","Skincare","Watches & wearables","Bags"],
    "Books & Media":["Novels","Computer Science","Civil Engineering","Electrical Engineering","Electronics and communication Engineering","Engineering and compuational Mechanics","Mechanical Engineering","Metallurgy and Material Engineering","Production and Industrial Engineering"],
    Stationary:["NoteBooks &Diaries","Pens&Pencils","Glue &Tapes","Calculators","Art"],
    Electronics:["Mobiles","Earphones &headphones","Speakers","Laptop","Harddisks","USB & PenDrives","Fan& Cooler"],
    "Decors& Lifestyle":["Room Decors","Curtains","Organisers","Bed and Pillow","Mattress","Furniture","Bottles"],
    Notes :["Notes","PYQs","Lab Manuals","Handwritten Notes","Assignments Question"],
    "Society's club":["Culfest","Faces","Invicta","Rooh","BTBS","Inoreva","Pcon","Web Team","Awahan","Urja","Ojass","LDS","Revanta","NSS","Phocus","Phoenix","QNite","Rays","E-cell","Alumini Relation","Drift Racing","Analytics Club","Soft Skills","Daksh","Ecoriders","GoGreenClub"]

  }

  return (

    <div className='flex items-center justify-between py-5 font-medium sticky top-0 bg-white z-30'>

      {/* MENU BUTTON */}
      <button
        onClick={() => setVisible(true)}
        className="text-2xl cursor-pointer"
      >
        ☰
      </button>

      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo} className='w-36' alt="logo" />
      </Link>

      {/* RIGHT ICONS */}
      <div className="flex items-center gap-6">

        <img
        onClick={()=>{
          console.log("Search clicked")
          setShowSearch(true)}}
          src={assets.search_icon}
          className="w-5 cursor-pointer opacity-70 hover:opacity-100 transition"
          alt="search"
        />

        <Profiledropdown />

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=""
        />

      </div>

      <SidebarMenu
        visible={visible}
        setVisible={setVisible}
        submenu={submenu}
        setSubmenu={setSubmenu}
        subCategories={subCategories}
      />

    </div>
  )
}

export default Navbar