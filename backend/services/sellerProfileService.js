import User from "../models/User.js";
import Products from "../models/Product.js";

export const getSellerProfileService = async (sellerId) => {

    const seller = await User.findById(sellerId).select(
        "name profileImage trustScore sellerVerified createdAt"
    );

    if (!seller) {
        throw new Error("Seller not found.");
    }

    const activeProducts = await Products.countDocuments({
        seller: sellerId,
        status: "Available",
    });

    const productsSold = await Products.countDocuments({
        seller: sellerId,
        status: "Sold",
    });

    return {
        ...seller.toObject(),
        activeProducts,
        productsSold,
    };
};

export const getSellerProductsService = async (
    sellerId
) => {

    const products = await Products.find({
        seller: sellerId,
        status: "Available",
    })
        .populate(
            "seller",
            "name profileImage trustScore sellerVerified"
        )
        .sort({
            createdAt: -1,
        });

    return products;
};