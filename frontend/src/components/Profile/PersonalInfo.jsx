import React from "react";
import { FiCamera } from "react-icons/fi";

const PersonalInfo = ({ profile, setProfile }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            {/* Heading */}

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Personal Information
            </h2>


            {/* Profile Image */}

            <div className="flex flex-col items-center mb-8">

                <div className="relative">

                    {profile.profileImage ? (

                        <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
                        />

                    ) : (

                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">

                            <span className="text-3xl font-semibold text-gray-500">
                                {profile.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>

                        </div>

                    )}


                    <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full"
                    >
                        <FiCamera />
                    </button>

                </div>


                <p className="text-sm text-gray-500 mt-3">
                    Upload Profile Photo
                </p>

            </div>


            {/* Form */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                {/* Full Name */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={profile.name || ""}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                </div>


                {/* Phone Number */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber || ""}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                </div>


                {/* College Email */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        College Email
                    </label>

                    <input
                        type="email"
                        name="collegeEmail"
                        value={profile.collegeEmail || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                    />

                </div>


                {/* Personal Email */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Personal Email
                    </label>

                    <input
                        type="email"
                        name="personalEmail"
                        value={profile.personalEmail || ""}
                        onChange={handleChange}
                        placeholder="Enter your personal email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />

                </div>


                {/* Registration Number */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Number
                    </label>

                    <input
                        type="text"
                        value={profile.registrationNumber || ""}
                        disabled
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 text-gray-600 cursor-not-allowed"
                    />

                </div>

            </div>

        </div>
    );
};

export default PersonalInfo;