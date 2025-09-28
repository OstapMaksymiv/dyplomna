import express from 'express';
import { createTransaction, getTransactions } from '../services/transactions';
import { authenticateToken, AuthRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  const data = await getTransactions(req.userId!); // отримує userId з токена
  console.log(data);
  
  res.json(data);
});

router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  const data = await createTransaction({ ...req.body, userId: req.userId });
  res.json(data);
});

export default router;
