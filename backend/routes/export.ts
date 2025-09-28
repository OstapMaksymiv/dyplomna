import express from 'express';
import { exportToJSON } from '../services/export';
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const data = await exportToJSON(req.params.userId);
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

export default router;