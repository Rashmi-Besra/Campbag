import {
    getUserNotificationsService,
    getUnreadNotificationCountService,
    markNotificationAsReadService,
    markAllNotificationsAsReadService,
} from "../services/notificationService.js";


/* ===============================
   Get Notifications
================================ */

export const getNotifications = async (req, res) => {

    try {

        const notifications =
            await getUserNotificationsService(
                req.user._id
            );

        return res.status(200).json({

            success: true,

            notifications,

        });

    } catch (error) {

        console.error(
            "GET NOTIFICATIONS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


/* ===============================
   Get Unread Count
================================ */

export const getUnreadNotificationCount = async (
    req,
    res
) => {

    try {

        const count =
            await getUnreadNotificationCountService(
                req.user._id
            );

        return res.status(200).json({

            success: true,

            count,

        });

    } catch (error) {

        console.error(
            "GET UNREAD COUNT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


/* ===============================
   Mark One As Read
================================ */

export const markNotificationAsRead = async (
    req,
    res
) => {

    try {

        const notification =
            await markNotificationAsReadService(

                req.user._id,

                req.params.id

            );

        return res.status(200).json({

            success: true,

            message:
                "Notification marked as read.",

            notification,

        });

    } catch (error) {

        console.error(
            "MARK NOTIFICATION ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


/* ===============================
   Mark All As Read
================================ */

export const markAllNotificationsAsRead = async (
    req,
    res
) => {

    try {

        await markAllNotificationsAsReadService(
            req.user._id
        );

        return res.status(200).json({

            success: true,

            message:
                "All notifications marked as read.",

        });

    } catch (error) {

        console.error(
            "MARK ALL NOTIFICATIONS ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};