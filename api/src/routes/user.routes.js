import { Router } from "express";
import { authorization } from "../utils/messageErrors.js";
import userController from "../controllers/usersControllers.js";

const userRouter = Router()

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUser );

userRouter.put('/:uid', authorization('Admin'), userController.updateUser)

userRouter.delete('/:uid', authorization('Admin'), userController.deleteUser);

export default userRouter
