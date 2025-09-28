import express from 'express';
import { createCategory, getCategories } from '../services/categories';
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const data = await getCategories(req.params.userId);
  res.json(data);
});

router.post('/', async (req, res) => {
  const data = await createCategory(req.body);
  res.json(data);
});

export default router;