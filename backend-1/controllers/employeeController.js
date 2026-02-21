import Employee from "../models/Employee.js";

export const getEmployees=async(req,res)=>{
 res.json(await Employee.find());
};

export const addEmployee=async(req,res)=>{
 res.json(await Employee.create(req.body));
};