import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);

app.listen(3001, () => console.log('Backend running on port 3001'));