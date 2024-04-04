import { Router } from 'express';
import userRouter from './user.routes.js';
import sessionsRouter from './sessions.routes.js';

const router = Router()

router.use('/sessions', sessionsRouter)
router.use('/user', userRouter)

export default router
 