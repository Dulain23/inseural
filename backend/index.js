import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

//Importing Routes
import authRoutes from "./routes/auth.route.js"

//Middleware
dotenv.config();
const app = express(); 
app.use(express.json());

//Middleware For Errors and Success Messages
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const success = err.success !== undefined ? err.success : false;
    const body = err.body || {};

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        ...body,
    });
});

// Configure CORS
const frontendServer = 'http://localhost:5173';
const corsOptions = {
    origin: frontendServer,
    credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use('/api/auth', authRoutes);

//Connect to Database & Start Server 
mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('App Status: MongoDB Connected')
    app.listen(4000, () => {
        console.log("App Status: Server Started & Running")
    });
}).catch((error) => {
    console.log(error);
})