import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { addEmployee } from "../controllers/EmpController.js";


const router = express.Router();

// router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addEmployee);

// router.get("/:deptId", authMiddleware, getDepartment);
// router.put("/:deptId", authMiddleware, updateDepartment);
// router.delete("/:deptId", authMiddleware, deleteDept);


export default router;
