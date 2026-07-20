import express from "express";
import auth from "../middleware/auth.js";

import {
    placeOrder,
    getOrders,
} from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", auth, placeOrder);

orderRoute.get("/", auth, getOrders);

export default orderRoute;