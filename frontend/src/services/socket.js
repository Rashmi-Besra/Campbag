import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
    autoConnect: false,
    withCredentials: true,
});

export const connectSocket = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("No token found. Socket not connected.");
        return;
    }

    socket.auth = {
        token,
    };

    if (!socket.connected) {
        socket.connect();
    }
};

export default socket;