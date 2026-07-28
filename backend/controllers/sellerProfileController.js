import {
    getSellerProfileService,
    getSellerProductsService,
} from "../services/sellerProfileService.js";

export const getSellerProfile = async (req, res) => {
    try {

        const seller = await getSellerProfileService(
            req.params.sellerId
        );

        return res.status(200).json({
            success: true,
            seller,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getSellerProducts = async (req, res) => {
    try {

        const products =
            await getSellerProductsService(
                req.params.sellerId
            );

        return res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};