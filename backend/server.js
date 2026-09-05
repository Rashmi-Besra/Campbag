import express from 'express'
import cors from 'cors'
import { setSocketIO } from "./config/socket.js";
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoute from './Route/userRoute.js'
import productRoute from "./Route/productRoute.js";
import wishlistRoute from "./Route/wishlistRoute.js";
import cartRoute from "./Route/cartRoute.js";
import orderRoute from './Route/orderRoute.js'
import sellerRoute from "./Route/sellerRoute.js";
import reviewRoute from "./Route/reviewRoute.js";

import sellerProfileRoute from "./Route/sellerProfileRoute.js";
import profileRoute from "./Route/profileRoute.js";
import notificationRoutes from "./Route/notificationRoutes.js";
import jwt from "jsonwebtoken";
import http from "http";
import {Server} from "socket.io";

//App config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares:
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user',userRoute)
app.use("/api/product", productRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/seller", sellerRoute);
app.get('/',(req,res)=>{
    res.send("API working")
})
app.use(
    "/api/reviews",
    reviewRoute
);
app.use("/api/sellerprofile", sellerProfileRoute);
app.use(
    "/api/notification",
    notificationRoutes
);

const server=http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

setSocketIO(io);

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error("Authentication token missing"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.userId = decoded.id;

        next();
    } catch (error) {
        next(new Error("Invalid authentication token"));
    }
});
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    console.log("User ID:", socket.userId);

    socket.join(`user:${socket.userId}`);

    console.log(`User joined room: user:${socket.userId}`);

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
