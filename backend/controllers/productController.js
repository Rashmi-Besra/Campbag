import Products from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import { addProductSchema } from "../validators/productValidator.js";

const addProduct = async (req, res) => {
  try {

    // Validate
    const result = addProductSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    // Get validated data
    const {
      name,
      description,
      price,
      category,
      subCategory,
      quantity,
      condition,
      
    } = result.data;

    // Check images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image.",
      });
    }

    // Logged in seller
    const seller = req.user._id;

    const uploadedImages = [];

for (const file of req.files) {

  const uploadresult = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "CampusMart/products",
    }
  );

  uploadedImages.push({
    url: uploadresult.secure_url,
    public_id: uploadresult.public_id,
  });

}

    

    const product = await Products.create({

  name,

  description,

  price,

  category,

  subCategory,

  quantity,

  condition,

  seller:req.user._id,

  images: uploadedImages,

});


await User.findByIdAndUpdate(
    req.user._id,
    {
        isSeller: true,
    }
);
return res.status(201).json({

  success: true,

  message: "Product added successfully.",

  product,

});




  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getAllProducts = async (req, res) => {
  try {

    const products = await Products.find({
     
      status: "Available"
    })
    .populate("seller", "name profileImage trustScore sellerVerified")
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id)
      .populate(
        "seller",
        "name profileImage trustScore sellerVerified"
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Increase view count
    product.views += 1;
    await product.save();

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const products = await Products.find({
      seller: sellerId,
    }).sort({ createdAt: -1 });

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


const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // Only owner can edit
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized."
      });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "subCategory",
      "quantity",
      "condition",
      "status"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // Only owner can delete
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized."
      });
    }

    // Delete all Cloudinary images
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete product
    await Products.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  getMyProducts,
  updateProduct,
  deleteProduct
};