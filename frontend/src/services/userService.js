import api from "../api/api";


// ==============================
// Get My Profile
// ==============================

export const getMyProfile = async () => {

    const response = await api.get("/user/profile");

    return response.data;

};


// ==============================
// Complete Profile
// ==============================

export const completeProfile = async (profileData) => {

    const response = await api.put(
        "/user/complete-profile",
        profileData
    );

    return response.data;

};