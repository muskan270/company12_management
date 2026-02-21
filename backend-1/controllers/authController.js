import User from "../models/User.js";
import {generateOTP} from "../utils/otp.js";

export const register=async(req,res)=>{
 const {employeeId,email,department}=req.body;
 await User.create({employeeId,email,department});
 res.json("Registered");
};

export const requestOtp=async(req,res)=>{
 const {employeeId,email}=req.body;
 const user=await User.findOne({employeeId,email});
 const otp=generateOTP();
 user.otp=otp;
 user.otpExpires=Date.now()+300000;
 await user.save();
 console.log("OTP:",otp);
 res.json("OTP sent");
};

export const verifyOtp=async(req,res)=>{
 const {employeeId,otp}=req.body;
 const user=await User.findOne({employeeId});
 if(user.otp!==otp) return res.status(400).json("Wrong OTP");
 res.json(user);
};