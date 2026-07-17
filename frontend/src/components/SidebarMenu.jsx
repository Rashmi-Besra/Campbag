import React from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

const SidebarMenu = ({ visible, setVisible, submenu, setSubmenu, subCategories }) => {

  return (
    <>
      {/* MOBILE MENU */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl overflow-y-auto transition-transform duration-300 z-50 
${visible ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="p-6 flex justify-between items-center border-b">

          <img src={assets.logo} className='w-30' alt="" />

          <button
            onClick={() => setVisible(false)}
            className="text-xl cursor-pointer">
            ✕
          </button>

        </div>

        <div className="flex flex-col gap-6 p-6 text-lg">

          <p onClick={() => setSubmenu("Men")} className="cursor-pointer hover:text-pink-500">Men →</p>

          <p onClick={() => setSubmenu("Women")} className="cursor-pointer hover:text-pink-500">Women →</p>

          <p onClick={() => setSubmenu("Books & Media")} className="cursor-pointer hover:text-pink-500">Books & Media →</p>

          <p onClick={() => setSubmenu("Stationary")} className="cursor-pointer hover:text-pink-500">Stationary →</p>

          <p onClick={() => setSubmenu("Electronics")} className="cursor-pointer hover:text-pink-500">Electronics →</p>

          <p onClick={() => setSubmenu("Decors& Lifestyle")} className='cursor-pointer hover:text-pink-500'>Decors& Lifestyle →</p>
          <Link
  to="/notes"
  onClick={() => setVisible(false)}
  className="cursor-pointer hover:text-pink-500"
>
  Notes
</Link>
          <p onClick={() => setSubmenu("Society's Store")} className='cursor-pointer hover:text-pink-500'>Society's Store →</p>


        </div>


        {/* SECOND SIDEBAR */}
        {submenu && (

          <div className="absolute top-0 left-0 h-full w-full bg-white z-50">

            <div className="p-6 border-b flex justify-between">

              <button onClick={() => setSubmenu(null)}>
                ← Back
              </button>

            </div>

            <div className="flex flex-col gap-6 p-6 text-lg">

              {subCategories[submenu].map((item, index) => (

                <Link
                  key={index}
                 to={`/collection/${submenu}/${encodeURIComponent(item)}`}
                  className="cursor-pointer hover:text-pink-500"
                  onClick={() => {
                    setVisible(false)
                    setSubmenu(null)
                  }}
                >

                  {item}

                </Link>

              ))}

            </div>

          </div>

        )}

      </div>


      {/* BACKGROUND OVERLAY */}
      {visible && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setVisible(false)}
        ></div>
      )}
    </>
  )
}

export default SidebarMenu