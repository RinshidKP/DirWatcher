import express from 'express';
import { body, validationResult } from 'express-validator';
import directoryWatcherService from '../services/directoryWatcherService.js';

const router = express.Router();

router.get('/config', async (req, res) => {
  try {
    const config = await directoryWatcherService.getConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching configuration', error });
  }
});

router.post(
  '/config',
  [
    body('directory').isString().withMessage('Directory must be a string'),
    body('magic').isString().withMessage('Magic string must be a string'),
    body('cronInterval').isString().withMessage('Cron interval must be a string'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { directory, magic, cronInterval } = req.body;
      await directoryWatcherService.updateConfig({ directory, magic, cronInterval });
      res.json({ message: 'Configuration updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating configuration', error });
    }
  }
);

export default router;