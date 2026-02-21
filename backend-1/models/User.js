import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 employeeId:String,
 email:String,
 department:String,
 otp:String,
 otpExpires:Date
});

export default mongoose.model("User",userSchema);