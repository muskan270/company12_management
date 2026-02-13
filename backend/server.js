import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// In-memory OTP store
const otpStore = {};

// Send OTP API
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
    html: `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 5 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP API
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP required" });

  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
