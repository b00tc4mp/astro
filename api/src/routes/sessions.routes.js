import { Router } from "express";  
import passport from "passport";
import { authorization, passportError } from "../utils/messageErrors.js";
import sessionController from "../controllers/sessionsController.js";

const sessionsRouter = Router()

sessionsRouter.get('/current', passportError('jwt'), authorization('user'), sessionController.getCurrentSessions)

sessionsRouter.post('/login', passport.authenticate('login'), sessionController.postSessions)

sessionsRouter.post('/register', passport.authenticate('register'), sessionController.registerPost )

sessionsRouter.get('/logout', sessionController.getLogout )

export default sessionsRouter
