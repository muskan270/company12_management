import express from "express";
import {getEmployees,addEmployee} from "../controllers/employeeController.js";
import { getEmployeeById, searchEmployeeByName } from "../controllers/employeeController.js";
const router=express.Router();

router.get("/",getEmployees);
router.post("/",addEmployee);
router.get("/id/:id", getEmployeeById);
router.get("/search", searchEmployeeByName);


export default router;