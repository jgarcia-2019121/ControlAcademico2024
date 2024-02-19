import express from 'express';
import { createCourse, editCourse, deleteCourse, getCoursesForTeacher } from './teacherController.js';
import { validateJwt } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/courses/create',  createCourse);

router.put('/courses/:id', validateJwt, editCourse);

router.delete('/courses/:id', validateJwt, deleteCourse);

router.get('/courses', validateJwt, getCoursesForTeacher)

export default router;
