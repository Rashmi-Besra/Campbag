import React, {
    useEffect,
    useState
} from "react";

import { Bell } from "lucide-react";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../services/notificationService";

import socket from "../../services/socket";

import { useNavigate } from "react-router-dom";


const NotificationBell = () => {

    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const [open, setOpen] =
        useState(false);

    const navigate = useNavigate();


    /* ===============================
       Fetch Notifications
    ================================ */

    const fetchNotifications = async () => {

        try {

            const response =
                await getNotifications();

            setNotifications(
                response.notifications || []
            );

        } catch (error) {

            console.error(
                "Failed to fetch notifications:",
                error
            );

        }

    };


    /* ===============================
       Fetch Unread Count
    ================================ */

    const fetchUnreadCount = async () => {

        try {

            const response =
                await getUnreadNotificationCount();

            setUnreadCount(
                response.count || 0
            );

        } catch (error) {

            console.error(
                "Failed to fetch unread count:",
                error
            );

        }

    };


    /* ===============================
       Socket + Initial Data
    ================================ */

    useEffect(() => {

        fetchNotifications();

        fetchUnreadCount();


        const handleNewNotification =
            (notification) => {

            console.log(
                "New notification received:",
                notification
            );


            setNotifications(
                (previous) => [
                    notification,
                    ...previous,
                ]
            );


            setUnreadCount(
                (previous) =>
                    previous + 1
            );

        };


        socket.on(
            "notification:new",
            handleNewNotification
        );


        return () => {

            socket.off(
                "notification:new",
                handleNewNotification
            );

        };

    }, []);


    /* ===============================
       Notification Click
    ================================ */

    const handleNotificationClick =
        async (notification) => {

        try {

            /*
             * Mark notification as read
             */

            if (!notification.isRead) {

                await markNotificationAsRead(
                    notification._id
                );

            }


            /*
             * Navigate to the related order
             */

            if (notification.order?._id) {

                /*
                 * NEW_ORDER is sent to the seller.
                 *
                 * All order-status notifications
                 * are currently sent to the buyer.
                 */

                const sellerNotificationTypes = [
                    "NEW_ORDER",
                ];


                if (
                    sellerNotificationTypes.includes(
                        notification.type
                    )
                ) {

                    navigate(
                        `/seller/orders/${notification.order._id}`
                    );

                } else {

                    navigate(
                        `/orders/${notification.order._id}`
                    );

                }

            }


            /*
             * Close dropdown
             */

            setOpen(false);


            /*
             * Refresh notification state
             */

            fetchNotifications();

            fetchUnreadCount();


        } catch (error) {

            console.error(
                "Failed to open notification:",
                error
            );

        }

    };


    /* ===============================
       Mark All Read
    ================================ */

    const handleMarkAllRead =
        async () => {

        try {

            await markAllNotificationsAsRead();


            setNotifications(
                (previous) =>
                    previous.map(
                        (notification) => ({
                            ...notification,
                            isRead: true,
                        })
                    )
            );


            setUnreadCount(0);


        } catch (error) {

            console.error(
                "Failed to mark notifications:",
                error
            );

        }

    };


    /* ===============================
       UI
    ================================ */

    return (

        <div className="relative">


            {/* ===============================
                Notification Bell
            ================================ */}

            <button
                onClick={() =>
                    setOpen(!open)
                }
                className="
                    relative
                    p-2
                    rounded-full
                    hover:bg-pink-300
                    transition
                "
                aria-label="Notifications"
            >

                <Bell
                    size={22}
                    strokeWidth={2}
                />


                {/* Unread Badge */}

                {unreadCount > 0 && (

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            bg-red-500
                            text-white
                            text-xs
                            rounded-full
                            min-w-5
                            h-5
                            flex
                            items-center
                            justify-center
                            px-1
                        "
                    >
                        {unreadCount}
                    </span>

                )}

            </button>


            {/* ===============================
                Notification Dropdown
            ================================ */}

            {open && (

                <div
                    className="
                        absolute
                        right-0
                        mt-3
                        w-80
                        bg-white
                        border
                        rounded-lg
                        shadow-lg
                        z-50
                    "
                >


                    {/* Header */}

                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            p-4
                            border-b
                        "
                    >

                        <h3
                            className="
                                font-semibold
                            "
                        >
                            Notifications
                        </h3>


                        {unreadCount > 0 && (

                            <button
                                onClick={
                                    handleMarkAllRead
                                }
                                className="
                                    text-sm
                                    text-blue-600
                                "
                            >
                                Mark all read
                            </button>

                        )}

                    </div>


                    {/* Notification List */}

                    <div
                        className="
                            max-h-96
                            overflow-y-auto
                        "
                    >

                        {notifications.length === 0 ? (

                            <p
                                className="
                                    p-6
                                    text-center
                                    text-gray-500
                                "
                            >
                                No notifications
                            </p>

                        ) : (

                            notifications.map(
                                (notification) => (

                                    <button
                                        key={
                                            notification._id
                                        }
                                        onClick={() =>
                                            handleNotificationClick(
                                                notification
                                            )
                                        }
                                        className={`
                                            w-full
                                            text-left
                                            p-4
                                            border-b
                                            hover:bg-pink-50
                                            ${
                                                !notification.isRead
                                                    ? "bg-blue-50"
                                                    : ""
                                            }
                                        `}
                                    >


                                        {/* Title */}

                                        <p
                                            className="
                                                font-medium
                                            "
                                        >
                                            {
                                                notification.title
                                            }
                                        </p>


                                        {/* Message */}

                                        <p
                                            className="
                                                text-sm
                                                text-gray-600
                                                mt-1
                                            "
                                        >
                                            {
                                                notification.message
                                            }
                                        </p>


                                        {/* Date */}

                                        <p
                                            className="
                                                text-xs
                                                text-gray-400
                                                mt-2
                                            "
                                        >
                                            {new Date(
                                                notification.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </button>

                                )
                            )

                        )}

                    </div>

                </div>

            )}

        </div>

    );

};


export default NotificationBell;