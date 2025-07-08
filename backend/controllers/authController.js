import { otpVerification, generateAndSendOTP, Signup, signIn } from '../services/authService.js';

export const sendOtp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await generateAndSendOTP({ name, email, password, role });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const {name, email, password, role, userOtp} = req.body;
    const result = await otpVerification({email, userOtp});
    
    await Signup({name, email, password, role});

    res.status(200).json(result);
  } catch (err) {
    console.log("OTP verification error:", err);
    res.status(500).json({error: err.message});
  } 
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const result = await signIn({email, password});
    res.status(200).json(result);
  } catch(err) {
    res.status(500).json({message: err.message || "Login Failed!" });
  }
}