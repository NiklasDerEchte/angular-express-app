import { Router } from 'express';
import apiRouter from './rest/api';
const router = Router();

router.use('/api', apiRouter);

export default router;