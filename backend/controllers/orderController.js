
import { placeOrderSchema, updateOrderStatusSchema } from "../validators/orderValidator.js";
import {
    createOrderService,
    getMyOrdersService,
    getSingleOrderService,
    cancelOrderService,
    getSellerOrdersService,
    updateOrderStatusService,
    getSellerSingleOrderService,
} from "../services/orderService.js";

export const createOrder = async (req, res) => {

    try {

        const validatedData =
            placeOrderSchema.parse(req.body);

        const orders =
            await createOrderService(
                req.user._id,
                validatedData
            );

        return res.status(201).json({

            success: true,

            message:
                "Order placed successfully.",

            orders,

        });

    } catch (error) {

        console.log(
            "CREATE ORDER ERROR:",
            error
        );

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }

};

export const getMyOrders = async (req, res) => {

    try {

        const orders = await getMyOrdersService(
            req.user._id
        );

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getSingleOrder = async (req, res) => {

    try {

        const order = await getSingleOrderService(
            req.user._id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



export const cancelOrder = async (req, res) => {
    try {

        const order = await cancelOrderService(
            req.user._id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            order,
        });

    } catch (error) {

        console.log("CANCEL ORDER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSellerOrders = async (req, res) => {

    try {

        const orders = await getSellerOrdersService(
            req.user._id
        );

        return res.status(200).json({

            success: true,
            orders,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};

export const updateOrderStatus = async (req, res) => {

    try {

        const { status } =
            updateOrderStatusSchema.parse(req.body);

        const order = await updateOrderStatusService(
            req.user._id,
            req.params.id,
            status
        );

        return res.status(200).json({

            success: true,

            message: "Order status updated successfully.",

            order,

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message,

        });

    }
};
export const getSellerSingleOrder = async (req, res) => {

    try {

        const order = await getSellerSingleOrderService(
            req.user._id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

