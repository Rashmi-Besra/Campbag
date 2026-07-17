import Product from "../models/Product.js";
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

    

    const product = await Product.create({

  name,

  description,

  price,

  category,

  subCategory,

  quantity,

  condition,

  seller,

  images: uploadedImages,

});
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

export {
  addProduct,
};