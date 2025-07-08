import express from 'express';
import { login, sendOtp } from '../controllers/authController.js';
import { verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);

export default router;