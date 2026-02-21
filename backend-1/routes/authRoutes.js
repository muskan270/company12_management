import express from "express";
import {register,requestOtp,verifyOtp} from "../controllers/authController.js";

const router=express.Router();

router.post("/register",register);
router.post("/request-otp",requestOtp);
router.post("/verify-otp",verifyOtp);

export default router;