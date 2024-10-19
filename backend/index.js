import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//Importing Routes
import authRoutes from "./routes/auth.route.js"
import studentRoutes from "./routes/student.route.js"

//Middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);

//Connect to Database & Start Server 
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('App Status: MongoDB Connected')
    app.listen(4000, () => {
        console.log("App Status: Server Started & Running")
    });
}).catch((error) => {
    console.log(error);
})

//Middleware For Success and Error Handling
app.use((result, req, res, next) => {
    if (result.success === true) {
        const statusCode = result.statusCode || 200;
        return res.status(statusCode).json({
            success: true,
            message: result.message,
            ...result.body,
        });
    } else if (result.success === false) {
        const statusCode = result.statusCode || 500;
        return res.status(statusCode).json({
            success: false,
            message: result.message,
            statusCode,
        });
    } else {
        next(result);
    }
});