import bcrypt from "bcrypt";

import User from "./models/User.js";
import connectToDatabase from "./db/db.js";


const userRegister = async () => {
    connectToDatabase();
    try {
        const hashedpassword = await bcrypt.hash("admin", 10);

        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedpassword,
            role: "admin",
        });

        await newUser.save();
    } catch (error) {
        console.log(error);
    }
};

userRegister();
