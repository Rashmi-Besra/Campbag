import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyProfile
} from "../services/profileService";

import { toast } from "react-toastify";

const PersonalInformation = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);


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


    useEffect(() => {

        fetchProfile();

    }, []);


    if (loading) {

        return (
            <div className="flex justify-center items-center py-20">
                Loading...
            </div>
        );

    }


    if (!profile) {

        return (
            <div className="text-center py-20">
                Unable to load profile.
            </div>
        );

    }


    return (

        <div className="max-w-5xl mx-auto px-4 py-8">

            <h1 className="text-2xl font-semibold mb-8">
                Personal Information
            </h1>


            {/* Complete Profile */}

            {!profile.profileCompleted && (

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">

                    <h2 className="text-lg font-semibold text-indigo-900">
                        Complete Your Profile
                    </h2>

                    <p className="text-indigo-700 mt-2">
                        Add your personal and academic information
                        to complete your profile.
                    </p>

                    <button
                        onClick={() => navigate("/complete-profile")}
                        className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Complete Profile
                    </button>

                </div>

            )}


            {/* Information */}

            <div className="bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Basic Information
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Info
                        label="Full Name"
                        value={profile.name}
                    />

                    <Info
                        label="Email"
                        value={profile.Email}
                    />

                    <Info
                        label="Personal Email"
                        value={profile.personalEmail}
                    />

                    <Info
                        label="Phone Number"
                        value={profile.phoneNumber}
                    />

                    <Info
                        label="Registration Number"
                        value={profile.registrationNumber}
                    />

                    <Info
                        label="Branch"
                        value={profile.branch}
                    />

                    <Info
                        label="Semester"
                        value={profile.semester}
                    />

                    <Info
                        label="Hostel"
                        value={profile.hostel}
                    />

                </div>

            </div>

        </div>

    );
};


const Info = ({ label, value }) => {

    return (

        <div>

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="font-medium text-gray-900 mt-1">
                {value || "Not provided"}
            </p>

        </div>

    );

};


export default PersonalInformation;