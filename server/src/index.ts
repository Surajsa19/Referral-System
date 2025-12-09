import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import referralRoutes from './routes/referralRoutes';
import purchaseRoutes from './routes/purchaseRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://filesure-suraj.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/purchase', purchaseRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Referral System API is running');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
