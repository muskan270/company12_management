import express from "express";
import {getEmployees,addEmployee} from "../controllers/employeeController.js";

const router=express.Router();

router.get("/",getEmployees);
router.post("/",addEmployee);

export default router;