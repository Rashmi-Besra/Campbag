import React, { useState, useRef, useEffect } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";




const Profiledropdown = () => {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon */}
     <img
        src={assets.profile_icon}
        alt="profile"
        className="w-5 cursor-pointer rounded-full hover:ring-2 hover:ring-gray-300 transition"
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50">
          <p className="px-4 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-[#F5BABB]" onClick={()=>navigate('/Profile')}>
            My Profile
          </p>

          <p className="px-4 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-[#F5BABB]" onClick={() =>navigate('/orders')}>
            Orders
          </p>
            <p className="px-4 py-2 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-[#F5BABB]" onClick={()=>navigate('/wishlist')}>
            Wishlist
          </p>
          <hr className="my-1 border-gray-200" />

          <p className="px-4 py-2 text-sm text-red-500 rounded-lg cursor-pointer hover:bg-[#F5BABB]">
            Log Out
          </p>
        </div>
      )}
    </div>
  );
};

export default Profiledropdown;
