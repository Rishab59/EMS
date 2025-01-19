import jwt from "jsonwebtoken";

import User from "../models/User.js";


const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            res.status(404).json({
                success: false,
                error: "Token Not Provided",
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(404).json({
                success: false,
                error: "Invalid Token",
            });
        }

        const user = await User.findById({ _id: decoded._id }).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                error: "User Not Found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};


export default verifyUser;
