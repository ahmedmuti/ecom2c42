
import { Router } from "express";
import { addUser, allUsers, deleteUser, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = Router()
userRouter
    .route('/')
    .post(checkEmail, addUser)
    .get(allUsers)
userRouter
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default userRouter