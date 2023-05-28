import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import cookieParser from 'cookie-parser';
// Configuration 
dotenv.config() 

// MONGO DB CONNECTION
connectDB()

// PORT NUMBER FOR BACKEN RUNNING
const port = process.env.PORT || 5001

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use("/api/users", userRoutes)
app.use(notFound)
app.use(errorHandler)
app.listen(port,() => console.log(`Server running on por ${port}`))