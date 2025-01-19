import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import { addDepartment, deleteDept, getDepartment, getDepartments, updateDepartment } from "../controllers/deptController.js";


const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);

router.get("/:deptId", authMiddleware, getDepartment);
router.put("/:deptId", authMiddleware, updateDepartment);
router.delete("/:deptId", authMiddleware, deleteDept);


export default router;
