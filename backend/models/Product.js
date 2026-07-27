import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    // ========================
    // Basic Information
    // ========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    aiDescription: {
      type: String,
      default: "",
    },

    // ========================
    // Seller Information
    // ========================

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ========================
    // Product Images
    // ========================
   images: [
    {
        url: {
            type: String,
            required: true
        },

        public_id: {
            type: String,
            required: true
        }
    }
],

    // ========================
    // Pricing
    // ========================
    price: {
      type: Number,
      required: true,
    },

    aiSuggestedPrice: {
      type: Number,
      default: 0,
    },

   

    // ========================
    // Categories
    // ========================
    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: "",
    },

    // ========================
    // Product Type
    // product -> Normal Product
    // notes -> Notes Marketplace
    // society -> Society Store
    // event -> Fest Store
    // ========================
    productType: {
      type: String,
      enum: ["product", "notes", "society", "event"],
      default: "product",
    },

    // ========================
    // Product Condition
    // ========================
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Used"],
      default: "Used",
    },

    // ========================
    // Stock
    // ========================
    quantity: {
      type: Number,
      default: 1,
    },

    // allowQuantitySelection: {
    //   type: Boolean,
    //   default: true,
    // },

    // ========================
    // Status
    // ========================
    status: {
      type: String,
      enum: ["Available", "Reserved", "Sold"],
      default: "Available",
    },
//     isApproved: {
//     type: Boolean,
//     default: false,
// },

// isActive: {
//     type: Boolean,
//     default: true,
// },

    // ========================
    // Pickup
    // ========================
 
    // ========================
    // Search
    // ========================
    tags: [
      {
        type: String,
      },
    ],

    // ========================
    // Analytics
    // ========================
    views: {
      type: Number,
      default: 0,
    },

  
    rating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    // ========================
    // Campus Features
    // ========================
    campusDeal: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    wishlistCount: {
    type: Number,
    default: 0,
},

soldCount: {
    type: Number,
    default: 0,
},
    featured: {
      type: Boolean,
      default: false,
    },

    // reported: {
    //   type: Boolean,
    //   default: false,
    // },

    // ========================
    // Notes Marketplace Fields
    // (Used only when productType = "notes")
    // ========================
    branch: {
      type: String,
      default: "",
    },

    semester: {
      type: Number,
      default: null,
    },

    subject: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Products =
  mongoose.models.Product ||
  mongoose.model("Product", Product);

export default Products;