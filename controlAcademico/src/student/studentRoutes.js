import express from 'express';
import { assignCourse, viewCourses, editProfile, deleteProfile } from '../controllers/studentController.js';
import { validateJwt } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/courses/:courseId/assign', validateJwt, assignCourse);
router.get('/courses', validateJwt, viewCourses);
router.put('/profile', validateJwt, editProfile);
router.delete('/profile', validateJwt, deleteProfile);

export default router;
