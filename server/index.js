import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import deptRouter from "./routes/department.js";
import empRouter from "./routes/employee.js";

import connectToDatabase from "./db/db.js";


connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/department", deptRouter);
app.use("/api/employee", empRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${ process.env.PORT }`);
});
