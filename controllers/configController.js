import { Router } from 'express';
import directoryWatcherService from '../services/directoryWatcherService.js';

const router = Router();

router.get('/config', (req, res) => {
  const config = directoryWatcherService.getConfig();
  res.json(config);
});

router.put('/config', (req, res) => {
  const { directory, magic, cronInterval } = req.body;
  directoryWatcherService.updateConfig({ directory, magic, cronInterval });
  res.json({ message: 'Configuration updated successfully' });
});

export default router;
