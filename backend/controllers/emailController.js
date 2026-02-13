import nodemailer from "nodemailer";

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muskansoni.saroj27@gmail.com",
        pass: "mikg zslm xnta gmrq" // ← यहीं App Password
      }
    });

    await transporter.sendMail({
      from: "yourgmail@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Mail failed", error: err });
  }
};
