import { Router } from 'express';
import user from './user.js';
import channel from './channel.js';
const router = Router();

router.use('/user', user);
router.use('/user', channel);

export default router;