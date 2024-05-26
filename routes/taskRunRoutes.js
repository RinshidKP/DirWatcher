import express from 'express';
import TaskRun from '../models/taskRunModel.js';

const router = express.Router();

router.get('/task-runs', async (req, res) => {
  try {
    const taskRuns = await TaskRun.find().sort({ startTime: -1 });
    res.json(taskRuns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get task runs' });
  }
});

export default router;
