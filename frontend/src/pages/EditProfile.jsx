import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getMyProfile, updateMyProfile } from "../services/profileService";

const EditProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getMyProfile();

                if (response.success) {
                    setProfile(response.user);
                }

            } catch (error) {

                console.log(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load profile"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProfile();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSave = async (e) => {

        e.preventDefault();

        try {

            const response = await updateMyProfile({
                personalEmail: profile.personalEmail,
                phoneNumber: profile.phoneNumber,
                branch: profile.branch,
                semester: profile.semester,
                hostel: profile.hostel
            });

            if (response.success) {

                toast.success("Profile updated successfully");

                navigate("/personal-info");

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile"
            );

        }
    };


    if (loading) {
        return (
            <div className="text-center py-20">
                Loading profile...
            </div>
        );
    }


    if (!profile) {
        return (
            <div className="text-center py-20">
                Profile not found.
            </div>
        );
    }


    return (

        <div className="max-w-5xl mx-auto px-4 py-8">

            <h1 className="text-2xl font-semibold">
                Edit Profile
            </h1>

            <p className="text-gray-500 mt-2">
                Update your personal and academic information.
            </p>


            <form
                onSubmit={handleSave}
                className="mt-8 bg-white rounded-xl shadow p-6"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={profile.name || ""}
                            disabled
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>


                    {/* College Email */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            College Email
                        </label>

                        <input
                            type="email"
                            value={profile.collegeEmail || ""}
                            disabled
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>


                    {/* Registration Number */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Registration Number
                        </label>

                        <input
                            type="text"
                            value={profile.registrationNumber || ""}
                            disabled
                            className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                        />

                    </div>


                    {/* Personal Email */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Personal Email
                        </label>

                        <input
                            type="email"
                            name="personalEmail"
                            value={profile.personalEmail || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>


                    {/* Phone */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={profile.phoneNumber || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>


                    {/* Branch */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Branch
                        </label>

                        <select
                            name="branch"
                            value={profile.branch || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        >

                            <option value="">Select Branch</option>
                            <option value="CSE">
                                Computer Science and Engineering
                            </option>
                            <option value="ECE">
                                Electronics & Communication
                            </option>
                            <option value="EE">
                                Electrical Engineering
                            </option>
                            <option value="ME">
                                Mechanical Engineering
                            </option>
                            <option value="CE">
                                Civil Engineering
                            </option>
                            <option value="MME">
                                Material and Metallurgical Engineering
                            </option>
                            <option value="PIE">
                                Production and Industrial Engineering
                            </option>
                            <option value="ECM">
                                Electronics and Computer Engineering
                            </option>

                        </select>

                    </div>


                    {/* Semester */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Semester
                        </label>

                        <select
                            name="semester"
                            value={profile.semester || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        >

                            <option value="">Select Semester</option>

                            {[1,2,3,4,5,6,7,8].map((sem) => (
                                <option key={sem} value={sem}>
                                    {sem}
                                </option>
                            ))}

                        </select>

                    </div>


                    {/* Hostel */}

                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Hostel
                        </label>

                        <input
                            type="text"
                            name="hostel"
                            value={profile.hostel || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                    </div>

                </div>


                <div className="flex justify-end gap-4 mt-8">

                    <button
                        type="button"
                        onClick={() => navigate("/Profile")}
                        className="px-6 py-3 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        onClick={() => navigate("/personal-info")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>

                </div>

            </form>

        </div>
    );
};

export default EditProfile;