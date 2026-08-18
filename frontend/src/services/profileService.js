import api from "../api/api";

// Get logged-in user's profile
export const getMyProfile = async () => {
    const response = await api.get("/profile");
    return response.data;
};


// Complete/update profile
export const updateMyProfile = async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
};

export const deleteAccount = async (password) => {
  const response = await api.delete(
    "/user/delete-account",
    {
      data: {
        password,
      },
    }
  );

  return response.data;
};