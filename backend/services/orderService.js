import mongoose from "mongoose";

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import {
    createNotificationService,
} from "./notificationService.js";


export const createOrderService = async (
    buyerId,
    orderData
) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const cart = await Cart.findOne({
            user: buyerId,
        })
        .populate("items.product")
        .session(session);

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty.");
        }

        const sellerOrders = new Map();

        for (const item of cart.items) {

            const product = item.product;

            if (!product) {
                throw new Error("Product not found.");
            }

            if (product.status !== "Available") {
                throw new Error(
                    `${product.name} is no longer available.`
                );
            }

            if (product.quantity < item.quantity) {
                throw new Error(
                    `${product.name} has only ${product.quantity} item(s) left in stock.`
                );
            }

            const sellerId = product.seller.toString();

            if (!sellerOrders.has(sellerId)) {
                sellerOrders.set(sellerId, []);
            }

            sellerOrders.get(sellerId).push({
                product,
                quantity: item.quantity,
                price: product.price,
            });

        }

        const createdOrders = [];

for (const [sellerId, items] of sellerOrders) {

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {

        totalAmount += item.price * item.quantity;

        orderItems.push({

            product: item.product._id,

            quantity: item.quantity,

            price: item.price,

            option: "default",

        });

    }

    totalAmount += 10;

    const order = await Order.create(
        [{
            user: buyerId,

            seller: sellerId,

            items: orderItems,

            totalAmount,

            deliveryFee: 10,

            paymentMethod: orderData.paymentMethod,

            deliveryMethod: orderData.deliveryMethod,

            deliveryDetails: orderData.deliveryDetails,

            paymentStatus:
                orderData.paymentMethod === "ONLINE"
                    ? "Paid"
                    : "Pending",

            orderStatus: "Placed",

        }],
        { session }
    );

    createdOrders.push(order[0]);
    console.log("===== CREATING SELLER NOTIFICATION =====");
console.log("SELLER ID:", sellerId);
console.log("ORDER ID:", order[0]._id);
const notification =
    await createNotificationService({

        userId: sellerId,

        type: "NEW_ORDER",

        title: "New Order Received",

        message:
            `You received a new order containing ${items.length} product(s).`,

        orderId: order[0]._id,

        session,

    });

console.log(
    "===== NOTIFICATION CREATED ====="
);

console.log(notification);

}

for (const item of cart.items) {

    const product = item.product;

    // product.quantity -= item.quantity;

    // if (product.quantity <= 0) {

    //     product.quantity = 0;

    //     product.status = "Sold";

    // }

    // await product.save({ session });
    console.log("===== INVENTORY UPDATE =====");
console.log("Product:", product.name);
console.log("Buying quantity:", item.quantity);
console.log("Current quantity:", product.quantity);
console.log("Current soldCount:", product.soldCount);

   const updatedProduct = await Product.findOneAndUpdate(
    {
        _id: product._id,
        quantity: { $gte: item.quantity },
        status: "Available",
    },
    {
        $inc: {
            quantity: -item.quantity,
            soldCount: item.quantity,
        },
    },
    {
        session,
        new: true,
    }
);
console.log("UPDATED PRODUCT:");
console.log(updatedProduct);

if (!updatedProduct) {
    throw new Error(
        `${product.name} is no longer available in the requested quantity.`
    );
}

if (updatedProduct.quantity === 0) {

     await Product.findByIdAndUpdate(
        product._id,
        {
            $set: {
                status: "Sold",
            },
        },
        {
            session,
        }
    );
}

}

cart.items = [];

await cart.save({ session });

await session.commitTransaction();
return createdOrders;

    }
    
    
    
    
    
    catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

};

export const getMyOrdersService = async (
    buyerId
) => {

    const orders = await Order.find({
        user: buyerId,
    })
    .populate("seller", "name profileImage")
    .populate("items.product")
    .sort({
        createdAt: -1,
    });

    return orders;

};



export const cancelOrderService = async (
    buyerId,
    orderId
) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const order = await Order.findOne({
            _id: orderId,
            user: buyerId,
        })
        .populate("items.product")
        .session(session);

        if (!order) {
            throw new Error("Order not found.");
        }

        if (
            order.orderStatus === "Packed" ||
            order.orderStatus === "Out for Delivery" ||
            order.orderStatus === "Delivered"
        ) {
            throw new Error(
                "This order can no longer be cancelled."
            );
        }

        if (order.orderStatus === "Cancelled") {
            throw new Error(
                "Order already cancelled."
            );
        }

        // Restore Product Stock
        for (const item of order.items) {

            const product = item.product;

            const restoredProduct = await Product.findByIdAndUpdate(
                product._id,
                {
                    $inc: {
                        quantity: item.quantity,
                        soldCount: -item.quantity,
                    },
                },
                {
                    session,
                    new: true,
                }
            );

            if (!restoredProduct) {
                throw new Error(
                    `${product.name} could not be restored.`
                );
            }

            if (restoredProduct.quantity > 0) {
                restoredProduct.status = "Available";

                await restoredProduct.save({ session });
            }
        }

        // Update order status
        order.orderStatus = "Cancelled";

        await order.save({ session });

        // Create seller notification
        await createNotificationService({
            userId: order.seller,
            type: "ORDER_CANCELLED",
            title: "Order Cancelled",
            message: "A buyer has cancelled an order.",
            orderId: order._id,
            session,
        });

        await session.commitTransaction();

        return order;

    } catch (error) {

        await session.abortTransaction();

        throw error;

    } finally {

        session.endSession();

    }

};


export const getSingleOrderService = async (
    buyerId,
    orderId
) => {

    const order = await Order.findOne({
        _id: orderId,
        user: buyerId,
    })
    .populate("seller", "name profileImage sellerVerified")
    .populate("items.product");

    if (!order) {
        throw new Error("Order not found.");
    }

    return order;

};

export const updateOrderStatusService = async (
    sellerId,
    orderId,
    newStatus
) => {

    const allowedTransitions = {
        Placed: ["Accepted"],
        Accepted: ["Packed"],
        Packed: ["Out for Delivery"],
        "Out for Delivery": ["Delivered"],
    };

    const order = await Order.findOne({
        _id: orderId,
        seller: sellerId,
    });

    if (!order) {
        throw new Error("Order not found.");
    }

    if (order.orderStatus === "Cancelled") {
        throw new Error(
            "Cancelled orders cannot be updated."
        );
    }

    if (order.orderStatus === "Delivered") {
        throw new Error(
            "Order already delivered."
        );
    }

    const allowedNextStatuses =
        allowedTransitions[order.orderStatus];

    if (
        !allowedNextStatuses ||
        !allowedNextStatuses.includes(newStatus)
    ) {
        throw new Error(
            `Cannot change status from ${order.orderStatus} to ${newStatus}.`
        );
    }

    order.orderStatus = newStatus;

    await order.save();

    let notificationType;
    let notificationTitle;
    let notificationMessage;

    switch (newStatus) {

        case "Accepted":
            notificationType = "ORDER_ACCEPTED";
            notificationTitle = "Order Accepted";
            notificationMessage =
                "Your order has been accepted by the seller.";
            break;

        case "Packed":
            notificationType = "ORDER_PACKED";
            notificationTitle = "Order Packed";
            notificationMessage =
                "Your order has been packed and is ready for delivery.";
            break;

        case "Out for Delivery":
            notificationType = "ORDER_OUT_FOR_DELIVERY";
            notificationTitle = "Order Out for Delivery";
            notificationMessage =
                "Your order is now out for delivery.";
            break;

        case "Delivered":
            notificationType = "ORDER_DELIVERED";
            notificationTitle = "Order Delivered";
            notificationMessage =
                "Your order has been delivered successfully.";
            break;

        default:
            throw new Error(
                `Unsupported notification status: ${newStatus}`
            );
    }

    await createNotificationService({

        userId: order.user,

        type: notificationType,

        title: notificationTitle,

        message: notificationMessage,

        orderId: order._id,

    });

    return order;
};

export const getSellerOrdersService = async (sellerId) => {

    const orders = await Order.find({
        seller: sellerId,
    })
    .populate("user", "name Email profileImage")
    .populate("items.product")
    .sort({
        createdAt: -1,
    });

    return orders;

};

export const getSellerSingleOrderService = async (
    sellerId,
    orderId
) => {

    const order = await Order.findOne({
        _id: orderId,
        seller: sellerId,
    })
    .populate("user", "name email profileImage")
    .populate("items.product");

    if (!order) {
        throw new Error("Order not found.");
    }

    return order;
};

