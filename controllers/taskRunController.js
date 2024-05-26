import { Router } from 'express';
import TaskRun from '../models/taskRunModel.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const taskRuns = await TaskRun.find().sort({ startTime: -1 });
    res.json(taskRuns);
  } catch (error) {
    console.error('Error fetching task runs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;