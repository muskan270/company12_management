import mongoose from "mongoose";

const schema=new mongoose.Schema({
 name:String,
 role:String,
 department:String,
 experience:Number,
 projectYears:Number,
 competencies:[String],
 currentProject:String,
 projectTools:[String],
 tools:[String],
 technologies:[String],
 movement:String,
 photo:String
});

export default mongoose.model("Employee",schema);