import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Importing Routes
import routes from "./route.js"

//Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

app.listen(4000, () => {
    console.log("App Status: Server Started & Running")
});

//Routes
app.use('/api', routes);

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