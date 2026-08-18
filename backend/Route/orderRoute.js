import express from "express";
import auth from "../middleware/auth.js";

import {
    createOrder,
    getMyOrders,
    getSingleOrder,
    cancelOrder,
    getSellerOrders,
    updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post(
    "/",
    auth,
    createOrder
);

router.get(
    "/",
    auth,
    getMyOrders
);
router.get(
    "/seller",
    auth,
    getSellerOrders
);
router.get(
    "/:id",
    auth,
    getSingleOrder
);

router.patch(
    "/:id/cancel",
    auth,
    cancelOrder
);
router.patch(
    "/:id/status",
    auth,
    updateOrderStatus
);

export default router;