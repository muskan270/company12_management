import xlsx from "xlsx";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  skills: Object
});

const Employee = mongoose.model("Employee", employeeSchema);

async function importExcel() {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

  const workbook = xlsx.readFile("./data/Skill Matrix - PS.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = xlsx.utils.sheet_to_json(sheet);
    
    const employees = rows.map(row => {

      const employeeId = row["Employee ID"] || row["employeeId"];
      const name = row["Name"] || row["__EMPTY"];

      const skills = {};

      for (let key in row) {
        if (
          key !== "Employee ID" &&
          key !== "employeeId" &&
          key !== "Name" &&
          key !== "__EMPTY"
        ) {
          skills[key] = row[key];
        }
      }

      return {
        employeeId,
        name,
        skills
      };
    });

    await Employee.deleteMany({});
    await Employee.insertMany(employees);

    console.log("Data inserted successfully 🚀");

    mongoose.connection.close();

  } catch (error) {
    console.error(error);
  }
}

importExcel();