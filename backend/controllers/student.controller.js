import { errorHandler } from '../utils/error.js'
import { successHandler } from '../utils/success.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'


export const verifyToken = async (token) => {
    //Check if user has access token
    if (!token) return next(errorHandler(401, "Authorization Error - Access token is not available. Please log in again."));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        // Check if token is valid - clear token if invalid
        if (err) return res.clearCookie('access_token')
        .status(403).json(errorHandler(403, "Authorization Error - Access token is not valid. Please log in again."));

        // Check if Token ID matches the User ID.
        if (user.id === req.params.id) {
            return next(successHandler(200, "Authorization Success - User authorised.", { role : user.role }));
        }else{
            return res.clearCookie('access_token')
            .status(403).json(errorHandler(403, "Authorization Error - User not authorised."));
        }     
           
    });
}

export const verifyStudent = async (req, res, next) => {
    //Check if user has access token
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Authorization Error - Access token is not available. Please log in again."));
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        // Check if token is valid - clear token if invalid
        if (err) return res.clearCookie('access_token')
        .status(403).json(errorHandler(403, "Authorization Error - Access token is not valid. Please log in again."));

        // Check if Token ID matches the User ID.
        if (user.id === req.params.id) {

            return next(successHandler(200, "Authorization Success - User authorised.", { userType : user.role }));
        }else{
            return res.clearCookie('access_token')
            .status(403).json(errorHandler(403, "Authorization Error - User not authorised."));
        }     

    });
}