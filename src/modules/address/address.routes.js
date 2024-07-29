import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddress, getLoggedUserAddresses, removeAddress } from "./address.controller.js";


const addressRouter = Router()
addressRouter
    .route('/')
    .patch(protectedRoutes, allowedTo('user'), addAddress)
    .get(protectedRoutes, allowedTo('user'), getLoggedUserAddresses)
addressRouter
    .route('/:id')
    .delete(protectedRoutes, allowedTo('user', 'admin'), removeAddress)


export default addressRouter