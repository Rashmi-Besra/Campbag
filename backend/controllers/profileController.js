import User from "../models/User.js";

// ==============================
// Get Logged-in User Profile
// ==============================

export const getMyProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select(
            "-password"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};


// ==============================
// Update Logged-in User Profile
// ==============================

export const updateMyProfile = async (req, res) => {
    try {

        const {
            name,
            personalEmail,
            phoneNumber,
            branch,
            semester,
            hostel,
            profileImage,
        } = req.body;


        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }


        // Update only fields provided by frontend

        if (name !== undefined) {
            user.name = name;
        }

        if (personalEmail !== undefined) {
            user.personalEmail = personalEmail;
        }

        if (phoneNumber !== undefined) {
            user.phoneNumber = phoneNumber;
        }

        if (branch !== undefined) {
            user.branch = branch;
        }

        if (semester !== undefined) {
            user.semester = Number(semester);
        }

        if (hostel !== undefined) {
            user.hostel = hostel;
        }

        if (profileImage !== undefined) {
            user.profileImage = profileImage;
        }


        // Profile is now completed

        user.profileCompleted = true;


        await user.save();


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                Email: user.Email,
                personalEmail: user.personalEmail,
                registrationNumber: user.registrationNumber,
                phoneNumber: user.phoneNumber,
                branch: user.branch,
                semester: user.semester,
                hostel: user.hostel,
                profileImage: user.profileImage,
                profileCompleted: user.profileCompleted,
                sellerVerified: user.sellerVerified,
                isSeller: user.isSeller,
                trustScore: user.trustScore,
                rating: user.rating,
                totalSales: user.totalSales,
            },
        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};