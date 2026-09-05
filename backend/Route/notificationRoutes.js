import express from "express";

import auth from "../middleware/auth.js";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../controllers/notificationController.js";


const router = express.Router();


router.get(
    "/",
    auth,
    getNotifications
);


router.get(
    "/unread-count",
    auth,
    getUnreadNotificationCount
);


router.patch(
    "/:id/read",
    auth,
    markNotificationAsRead
);


router.patch(
    "/read-all",
    auth,
    markAllNotificationsAsRead
);


export default router;