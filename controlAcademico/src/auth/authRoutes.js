import express from 'express';
import { validateJwt } from '../middlewares/authMiddleware.js';
import { registerStudent, registerTeacher, login } from './authController.js';

const router = express.Router();

router.post('/register/student', registerStudent);
router.post('/register/teacher', validateJwt, registerTeacher);
router.post('/login', login);

export default router;
