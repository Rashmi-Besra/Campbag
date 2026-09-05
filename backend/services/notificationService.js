import Notification from "../models/Notification.js";
import { getSocketIO } from "../config/socket.js";

/* ===============================
   Create Notification
================================ */

export const createNotificationService = async ({
    userId,
    type,
    title,
    message,
    orderId = null,
    session = null,
}) => {

   const notification = await Notification.create(
    [{
        user: userId,
        type,
        title,
        message,
        order: orderId,
    }],
    session ? { session } : undefined
);

const createdNotification = notification[0];

const io = getSocketIO();

io.to(`user:${userId}`).emit(
    "notification:new",
    createdNotification
);

return createdNotification;
};


/* ===============================
   Get User Notifications
================================ */

export const getUserNotificationsService = async (
    userId
) => {

    const notifications = await Notification.find({
        user: userId,
    })
        .populate("order", "orderStatus totalAmount createdAt")
        .sort({
            createdAt: -1,
        });

    return notifications;
};


/* ===============================
   Get Unread Count
================================ */

export const getUnreadNotificationCountService = async (
    userId
) => {

    const count = await Notification.countDocuments({

        user: userId,

        isRead: false,

    });

    return count;
};


/* ===============================
   Mark Notification As Read
================================ */

export const markNotificationAsReadService = async (
    userId,
    notificationId
) => {

    const notification =
        await Notification.findOneAndUpdate(

            {
                _id: notificationId,

                user: userId,
            },

            {
                $set: {
                    isRead: true,
                },
            },

            {
                new: true,
            }
        );


    if (!notification) {

        throw new Error(
            "Notification not found."
        );

    }


    return notification;
};


/* ===============================
   Mark All As Read
================================ */

export const markAllNotificationsAsReadService = async (
    userId
) => {

    await Notification.updateMany(

        {
            user: userId,

            isRead: false,
        },

        {
            $set: {
                isRead: true,
            },
        }

    );

};