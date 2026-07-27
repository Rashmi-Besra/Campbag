import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        option: {
          type: String,
          default: "default",
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Packed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    deliveryFee: {
      type: Number,
      default: 10,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

 

    deliveryMethod: {
    type: String,
    enum: ["HOSTEL_DELIVERY", "SELF_PICKUP"],
    required: true,
},

deliveryDetails: {
    address: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    instructions: {
        type: String,
        default: "",
    },
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);