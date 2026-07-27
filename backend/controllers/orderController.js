import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { placeOrderSchema } from "../validators/orderValidator.js";



export const placeOrder = async (req, res) => {
    try {

        const result = placeOrderSchema.safeParse(req.body);

        if (!result.success) {

    return res.status(400).json({

        success: false,

        errors: result.error.issues

    });

}

const {

    deliveryMethod,

    address,

    phone,

    instructions

} = result.data;
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty."
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {

            const product = item.product;

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found."
                });
            }

            if (product.quantity < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} has only ${product.quantity} items left.`
                });
            }

            orderItems.push({
                product: product._id,
                option: item.option,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;
        }

      const order = await Order.create({

    user: req.user._id,

    items: orderItems,

    totalAmount,

    deliveryFee:10,

    paymentMethod:"COD",

    deliveryMethod,

    deliveryDetails:{

        address,

        phone,

        instructions

    }

});
        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        quantity: -item.quantity
                    }
                }
            );
        }

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            order
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            user: req.user._id
        })
        .populate("items.product")
        .sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

