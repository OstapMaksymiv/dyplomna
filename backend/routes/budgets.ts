import express from 'express';
import { createBudget, getBudgets } from '../services/budgets';
import { authenticateToken } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/:userId',authenticateToken, async (req, res) => {
  const data = await getBudgets(req.params.userId);
  res.json(data);
});

router.post('/',authenticateToken, async (req, res) => {
  const data = await createBudget(req.body);
  res.json(data);
});

export default router;