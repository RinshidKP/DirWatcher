import { Router } from 'express';
import configController from '../controllers/configController.js'
import taskRunController from '../controllers/taskRunController.js';

const router = Router();

router.use('/config', configController);
router.use('/taskruns', taskRunController);

export default router;