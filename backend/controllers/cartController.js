import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import {
  addCartSchema,
  updateCartSchema,
} from "../validators/cartValidator.js";

export const addToCart = async (req, res) => {
  console.log("BODY:", req.body);
    console.log("HEADERS:", req.headers);
  try {

    // Validate request
    const result = addCartSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const {
      productId,
      option,
      quantity,
    } = result.data;

    // Find Product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Stock Check
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available.`,
      });
    }

    // Find User Cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // Create Cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check if same product + same option already exists
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.option === option
    );

    if (existingItem) {

      // Calculate new quantity
      const newQuantity =
        existingItem.quantity + quantity;

      if (newQuantity > product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.quantity} items available.`,
        });
      }

      existingItem.quantity = newQuantity;

    } else {

      cart.items.push({
        product: productId,
        option,
        quantity,
      });

    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart.",
      cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });

  }
};

export const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate({
      path: "items.product",
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

export const updateCart = async (req, res) => {
  try {

    const result = updateCartSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.issues,
      });
    }

    const { productId, option, quantity } = result.data;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.option === option
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart.",
      });
    }

    // Remove item if quantity becomes 0
    if (quantity === 0) {

      cart.items = cart.items.filter(
        (cartItem) =>
          !(
            cartItem.product.toString() === productId &&
            cartItem.option === option
          )
      );

    } else {

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found.",
        });
      }

      if (quantity > product.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.quantity} items available.`,
        });
      }

      item.quantity = quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      cart,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

export const clearCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};