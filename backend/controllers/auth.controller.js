import { errorHandler } from '../utils/error.js'
import { successHandler } from '../utils/success.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Role from '../models/role.model.js'

export const verifyAuth = async (req, res, next) => {
    //Check if user has access token
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "Authorization Error - Access token is not available. Please log in again."));

    jwt.verify(token, process.env.JWT_SECRET, async (err, token) => {

        // Check if token is valid - clear token if invalid
        if (err) return res.clearCookie('access_token')
            .status(403).json(errorHandler(403, "Authorization Error - Access token is not valid. Please log in again."));

        // Check if Token ID matches the User ID.
        if (token.id === req.params.id) {
            try {
                // Fetch the role details from the Role model
                const roleDetails = await Role.findOne({ name: token.role });
                // Invalid Role
                if (!roleDetails) {
                    return res.clearCookie('access_token')
                        .status(403).json(errorHandler(403, "Authorization Error - User role details not found."));
                }
                // Return success with role details
                return next(successHandler(200, "Authorization Success - User authorised.", { roleDetails }));
            } catch (error) {
                return next(errorHandler(500, "Authorization Error - Database retrieval issue."));
            }
        } else {
            return res.clearCookie('access_token')
                .status(403).json(errorHandler(403, "Authorization Error - User not authorised."));
        }
    });
}

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if email is already used
    const emailExists = await User.findOne({ email });
    if (emailExists) return next(errorHandler(400, "Registration Error - Email already exists."));

    // Retrieve the STUDENT role from the database
    const studentRole = await Role.findOne({ name: 'STUDENT' });
    if (!studentRole) return next(errorHandler(500, "Registration Error - Account role not found."));

    // Create hashed password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new User
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: studentRole._id
    });

    try {
        // Save new User
        await newUser.save();
        return next(successHandler(201, "Registration Success - User created."));
    } catch (error) {
        return next(errorHandler(500, "Registration Error - Database retrieval issue."));
    }
}

export const login = async (req, res, next) => {

    const { email, password, remember_me } = req.body;

    try {
        // Check if email is valid
        const user = await User.findOne({ email });
        if (!user) return next(errorHandler(404, 'Login Error - User does not exist.'));

        // Check if password is valid
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return next(errorHandler(401, 'Login Error - Invalid login credentials.'));

        // Create Token and Put Cookie 
        const roles = await Role.findById(user.role);
        const token = jwt.sign({ id: user._id, role: roles.name, permissions: roles.permissions }, process.env.JWT_SECRET);

        // Remove password & role from User Data - Security
        const { password: userPassword, role: userRole, ...rest } = user._doc;

        // Cookie options
        const cookieOptions = { httpOnly: true };

        // Add extended expiration for remeber me feature
        if (remember_me === "on") {
            cookieOptions.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }

        return res.cookie('access_token', token, cookieOptions)
            .status(200).json(successHandler(200, "Login Success - User authenticated successfully.", { user: rest, role: roles.name, permissions: roles.permissions }));

    } catch (error) {
        next(errorHandler(500, "Login Error - Database retrieval issue."));
    }
}