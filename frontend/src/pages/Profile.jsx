import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import ProfileHeader from "../components/Profile/ProfileHeader";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useContext(ShopContext);

  const profileCards = [
    {
      title: "Personal Information",
      description: "View and manage your personal details",
      icon: "👤",
      path: "/personal-info",
    },

    {
      title: "Wishlist",
      description: "View products you have saved",
      icon: "❤️",
      path: "/wishlist",
    },

    {
      title: "Orders & Returns",
      description: "Track your orders and manage returns",
      icon: "📦",
      path: "/orders",
    },

    {
      title: "Seller",
      description: "Sell products and manage your store",
      icon: "🏪",
      path: "/seller",
    },

    {
      title: "Account Settings",
      description: "Change your account information",
      icon: "⚙️",
      path: "/account-settings",
    },

    {
      title: "Help",
      description: "Get help and contact support",
      icon: "❓",
      path: "/help",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Background / Header */}
      <div className="relative">

        {/* Background Image */}
        <div
          className="h-52 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')",
          }}
        >

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

        </div>

        {/* Profile Header */}
        <div className="relative max-w-6xl mx-auto px-4">

          <div className="absolute -bottom-16 left-4 sm:left-8">

            <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">

              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-semibold text-gray-500">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">

        {/* User information */}
        <div className="mb-8">

          <h1 className="text-3xl font-semibold text-gray-800">
            {user?.name || "Student"}
          </h1>

          <p className="text-gray-500 mt-1">
            {user?.Email || ""}
          </p>

        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {profileCards.map((card) => (

            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >

              <div className="flex items-start justify-between">

                <div
                  className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl"
                >
                  {card.icon}
                </div>

                <span className="text-gray-400 text-xl">
                  →
                </span>

              </div>

              <h2 className="text-lg font-semibold text-gray-800 mt-5">
                {card.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 leading-5">
                {card.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Profile;