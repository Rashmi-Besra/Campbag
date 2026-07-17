import mongoose from "mongoose"

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
        
    })

    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/CAMPBAG`)
    }catch(error){
        console.log("Failed to connect to MongoDB:", error.message);
        process.exit(1);        
    }
};

export default connectDB;
