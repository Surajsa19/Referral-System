import express from 'express';
import { makePurchase } from '../controllers/purchaseController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, makePurchase);

export default router;
