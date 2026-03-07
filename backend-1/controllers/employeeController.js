import Employee from "../models/Employee.js";

export const getEmployees=async(req,res)=>{
 res.json(await Employee.find());
};

export const addEmployee=async(req,res)=>{
 res.json(await Employee.create(req.body));
};
export const getEmployeeById = async (req,res) => {

    const employee = await Employee.findOne({
        employeeId: req.params.id
    });

    res.json(employee);
};
export const searchEmployeeByName = async (req,res) => {

    const employees = await Employee.find({
        name: { $regex: req.query.name, $options: "i" }
    });

    res.json(employees);
};