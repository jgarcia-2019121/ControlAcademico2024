import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from '../src/auth/authRoutes.js';
import teacherRoutes from '../src/teacher/teacherRoutes.js';
import { connectDB } from './mongo.js';
import { validateJwt, errorHandler } from '../src/middlewares/authMiddleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2650;
connectDB();

//revisar el middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/courses', teacherRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to academic control, created by: Jonathan Garcia');
});

app.use(validateJwt);
app.use(errorHandler);

export default app;