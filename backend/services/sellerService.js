import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js";
import streamifier from "streamifier";
import User from "../models/User.js";

/* ---------------- Dashboard ---------------- */

export const getDashboardData = async (sellerId) => {

    const totalProducts = await Product.countDocuments({
        seller: sellerId,
    });

    return {
        totalProducts,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    };
};

/* ---------------- Seller Products ---------------- */

export const getSellerProductsService = async (sellerId) => {

    const products = await Product.find({
        seller: sellerId,
    }).sort({ createdAt: -1 });

    return products;
};

/* ---------------- Upload Image Helper ---------------- */

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

            {
                folder: "campbag_products",
            },

            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }

        );

        streamifier
            .createReadStream(fileBuffer)
            .pipe(stream);

    });

};

/* ---------------- Create Product ---------------- */

export const createProductService = async (

    sellerId,

    productData,

    files

) => {

    console.log("========== SERVICE ==========");
    console.log(productData);
   const images = [];

if (files && files.length > 0) {

    for (const file of files) {

        const result = await uploadToCloudinary(file.buffer);

        images.push({
            url: result.secure_url,
            public_id: result.public_id,
        });

    }

}

    const seller = await User.findById(sellerId);

if (!seller) {
    throw new Error("Seller not found");
}

   const product = await Product.create({

    seller: sellerId,
    sellername: seller.name,

    name: productData.name,
    description: productData.description,

    category: productData.category,
    subCategory: productData.subCategory,
    price: Number(productData.price),

    quantity: Number(productData.quantity),

    branch: productData.branch,

    semester: productData.semester,

    condition: productData.condition,

    images,

});

    return product;

};

/* ---------------- Delete Product ---------------- */

export const deleteSellerProductService = async (

    sellerId,

    productId

) => {

    const product = await Product.findOne({

        _id: productId,

        seller: sellerId,

    });

    if (!product) {

        throw new Error("Product not found");

    }

    await Product.findByIdAndDelete(productId);

};

export const getSellerProductByIdService = async (
    sellerId,
    productId
) => {

    const product = await Product.findOne({
        _id: productId,
        seller: sellerId,
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

export const updateSellerProductService = async (
    sellerId,
    productId,
    productData,
    files
) => {

    const product = await Product.findOne({
        _id: productId,
        seller: sellerId,
    });

    if (!product) {
        throw new Error("Product not found");
    }

    let imageUrls = product.image;

    if (files && files.length > 0) {

        imageUrls = [];

        for (const file of files) {

            const result = await uploadToCloudinary(file.buffer);

            imageUrls.push(result.secure_url);

        }

    }

    product.name = productData.name;
    product.description = productData.description;
    product.category = productData.category;
    product.subCategory=productData.subCategory;
    product.price = Number(productData.price);
    product.quantity = Number(productData.quantity);
    product.branch = productData.branch;
    product.semester = productData.semester;
    product.condition = productData.condition;
    product.image = imageUrls;

    await product.save();

    return product;

};

import Order from "../models/Order.js";

export const getSellerOrdersService = async (sellerId) => {

    const orders = await Order.find({
        seller: sellerId,
    })
    .populate("buyer", "name email")
    .populate("items.product");

    return orders;

};

export const updateOrderStatusService = async (

    sellerId,

    orderId,

    status

) => {

    const order = await Order.findOne({

        _id: orderId,

        seller: sellerId,

    });

    if (!order) {

        throw new Error("Order not found");

    }

    order.status = status;

    await order.save();

    return order;

};