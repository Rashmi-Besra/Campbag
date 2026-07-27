const OrderStatusBadge = ({ status }) => {

    let styles = "";

    switch (status) {

        case "Pending":
            styles = "bg-yellow-100 text-yellow-700";
            break;

        case "Confirmed":
            styles = "bg-blue-100 text-blue-700";
            break;

        case "Shipped":
            styles = "bg-purple-100 text-purple-700";
            break;

        case "Delivered":
            styles = "bg-green-100 text-green-700";
            break;

        case "Cancelled":
            styles = "bg-red-100 text-red-700";
            break;

        default:
            styles = "bg-gray-100 text-gray-700";

    }

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${styles}`}
        >
            {status}
        </span>

    );

};

export default OrderStatusBadge;