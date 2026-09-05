import api from "../api/api";


// ===============================
// Get Notifications
// ===============================

export const getNotifications = async () => {

    const response = await api.get(
        "/notification"
    );

    return response.data;
};


// ===============================
// Get Unread Count
// ===============================

export const getUnreadNotificationCount = async () => {

    const response = await api.get(
        "/notification/unread-count"
    );

    return response.data;
};


// ===============================
// Mark One As Read
// ===============================

export const markNotificationAsRead = async (
    notificationId
) => {

    const response = await api.patch(
        `/notification/${notificationId}/read`
    );

    return response.data;
};


// ===============================
// Mark All As Read
// ===============================

export const markAllNotificationsAsRead = async () => {

    const response = await api.patch(
        "/notification/read-all"
    );

    return response.data;
};