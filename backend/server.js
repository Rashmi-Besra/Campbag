import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoute from './Route/userRoute.js'
import productRoute from "./Route/productRoute.js";
import wishlistRoute from "./Route/wishlistRoute.js";
import cartRoute from "./Route/cartRoute.js";
import orderRoute from './Route/orderRoute.js'



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
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log('server started on PORT :'+ port))
