import mongoose from "mongoose";

 const connectDB = async () => {
    try {
       const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected at ${conn.connection.host}`);
    } catch (error) {
        console.log(`Erron in mongodb:- ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;