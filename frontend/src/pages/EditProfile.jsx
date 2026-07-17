import React, { useState } from "react";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "Rashmi Besra",

        phone: "9876543210",

        personalEmail: "rashmi@gmail.com",

        collegeEmail: "2023ugcs001@nitjsr.ac.in",

        registrationNumber: "2023UGCS001",

        branch: "Computer Science & Engineering",

        semester: 5,

        hostel: "Hostel B",

        profileImage: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

        // Backend API Later

    };

    return (

        <div className="border-t pt-14 min-h-screen bg-gray-50">

            <div className="max-w-3xl mx-auto px-4 py-8">

                {/* Back */}

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-indigo-600 mb-6 hover:text-indigo-700"
                >

                    <FiArrowLeft />

                    Back

                </button>

                {/* Card */}

                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

                    <h1 className="text-3xl font-bold text-gray-800">

                        Edit Profile

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Update your personal and academic information.

                    </p>

                    {/* Profile Image */}

                    <div className="flex flex-col items-center mt-8">

                        <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">

                            <FiCamera className="text-4xl text-indigo-600" />

                        </div>

                        <button className="mt-4 text-indigo-600 hover:text-indigo-700">

                            Change Photo

                        </button>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-8"
                    >

                        {/* Personal Information */}

                        <div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4">

                                Personal Information

                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />

                                <input
                                    type="email"
                                    name="personalEmail"
                                    value={formData.personalEmail}
                                    onChange={handleChange}
                                    placeholder="Personal Email"
                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
                                />

                            </div>

                        </div>

                        {/* Academic Information */}

                        <div>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4">

                                Academic Information

                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <input
                                    value={formData.collegeEmail}
                                    disabled
                                    className="border rounded-lg px-4 py-3 bg-gray-100"
                                />

                                <input
                                    value={formData.registrationNumber}
                                    disabled
                                    className="border rounded-lg px-4 py-3 bg-gray-100"
                                />

                                 <select defaultValue={formData.branch} className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:rinf-indigo-500 focus:outline-none'>

          <option value="">Select Branch</option>
          <option value="CSE">Computer Science and Engineering</option>
          <option value="ECE">Electronics & communication</option>
          <option value="EE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Civil Engineeing</option>
          <option value="MME">Material and Metallurgical Engineering</option>
          <option value="PIE">Production and Industrial Engineering</option>
          <option value="ECM">Electronics and computer engineering</option>
         </select>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >

                                    {[1,2,3,4,5,6,7,8].map((sem) => (

                                        <option
                                            key={sem}
                                            value={sem}
                                        >

                                            {sem}

                                        </option>

                                    ))}

                                </select>

                                <input
                                    type="text"
                                    name="hostel"
                                    value={formData.hostel}
                                    onChange={handleChange}
                                    placeholder="Hostel"
                                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none md:col-span-2"
                                />

                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end gap-4">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
                            >

                                Save Changes

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditProfile;