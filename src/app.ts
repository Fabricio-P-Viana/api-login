import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cors from './utils/cors';
import swaggerUi from 'swagger-ui-express';
import specs from './utils/swagger';

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;