import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    employeeId: String,
    name: String,

    skills: {
        type: Object
    }

});

export default mongoose.model("Employee", employeeSchema);