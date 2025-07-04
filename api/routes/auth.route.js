import express from 'express';
import { google, signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { errorHandler } from '../utils/error.js';

const router=express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);

export default router;