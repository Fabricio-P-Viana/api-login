import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from './utils/cors';

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use(cors);

export default app;