import React from "react";
import { FiEdit2, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile }) => {

    const navigate = useNavigate();

    const getInitials = (name) => {

        if (!name) return "";

        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 p-8 relative">

            {/* Edit Button */}

            <button
                onClick={() => navigate("/edit-profile")}
                className="absolute top-5 right-5 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >

                <FiEdit2 />

                Edit Profile

            </button>

            <div className="flex flex-col items-center">

                {/* Profile Image */}

                {

                    profile.profileImage ?

                        <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                        />

                        :

                        <div className="w-32 h-32 rounded-full bg-indigo-100 border-4 border-indigo-200 flex items-center justify-center">

                            <span className="text-4xl font-bold text-indigo-700">

                                {getInitials(profile.name)}

                            </span>

                        </div>

                }

                {/* Name */}

                <h1 className="text-3xl font-bold text-gray-800 mt-5">

                    {profile.name}

                </h1>

                {/* Branch */}

                <p className="text-gray-500 mt-2">

                    {profile.branch}

                </p>

                {/* Semester */}

                <p className="text-gray-500">

                    Semester {profile.semester}

                </p>

                {/* Badge */}

                <div className="mt-5 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                    <FiCheckCircle />

                    <span>

                        Verified Student

                    </span>

                </div>

            </div>

        </div>

    );

};

export default ProfileCard;
