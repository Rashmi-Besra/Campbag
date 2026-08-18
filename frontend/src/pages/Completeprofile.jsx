import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AcademicInfo from "../components/Profile/AcademicInfo";
import PersonalInfo from "../components/Profile/PersonalInfo";
import Profileheader from "../components/Profile/Profileheader";

import {
    getMyProfile,
    updateMyProfile,
} from "../services/profileService";

const Completeprofile = () => {

    const [profileData, setProfileData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    // ==============================
    // Fetch Profile
    // ==============================

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getMyProfile();

                if (response.success) {

                    setProfileData(response.user);

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load profile."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);


    // ==============================
    // Save Profile
    // ==============================

    const handleSaveProfile = async () => {

        try {

            setSaving(true);

            const response = await updateMyProfile(
                profileData
            );

            if (response.success) {

                toast.success(
                    "Profile completed successfully!"
                );

                // Replace local data with updated DB data
                setProfileData(response.user);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==============================
    // Loading
    // ==============================

    if (loading) {

        return (
            <div className="flex justify-center items-center min-h-[400px]">

                <p className="text-gray-500">
                    Loading profile...
                </p>

            </div>
        );

    }


    // ==============================
    // Profile Not Found
    // ==============================

    if (!profileData) {

        return (
            <div className="flex justify-center items-center min-h-[400px]">

                <p className="text-red-500">
                    Unable to load profile.
                </p>

            </div>
        );

    }


    return (

        <div className="max-w-6xl mx-auto px-4 py-6">

            <Profileheader
                userName={profileData.name}
                completion={
                    profileData.profileCompleted ? 100 : 60
                }
            />


            <div className="mt-6 space-y-6">

                {/* Personal Information */}

                <PersonalInfo
                    profile={profileData}
                    setProfile={setProfileData}
                />


                {/* Academic Information */}

                <AcademicInfo
                    profile={profileData}
                    setProfile={setProfileData}
                />

            </div>


            {/* Save Button */}

            <div className="mt-8 flex justify-end">

                <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-3 rounded-lg font-medium transition"
                >

                    {saving
                        ? "Saving..."
                        : "Save & Continue"
                    }

                </button>

            </div>

        </div>

    );

};

export default Completeprofile;