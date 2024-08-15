import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Importing Routes
import authRoutes from "./routes/auth.route.js"

//Middleware
dotenv.config();
const app = express(); 
app.use(express.json());

// Configure CORS
const frontendServer = 'http://localhost:5173';
const corsOptions = {
    origin: frontendServer,
    credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use('/api/auth', authRoutes);

//Next Middleware For Errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

//Start Server 
app.listen(4000, () => {
    console.log("App Status: Server Started & Running")
});
