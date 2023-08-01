import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { jwtMiddleware } from '../middlewares/authentication';
import { AuthURLS } from "../utils/urls";
import auth_controller from '../controllers/auth_controller';
import AuthServices from '../services/auth_services';

// Authentication related router
const router = express.Router();
const prisma = new PrismaClient();
const authService = new AuthServices(prisma)

// Attempt to create a new user 
router.post(AuthURLS.registerApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const potentialUserData = request.body;
        response.status(201).json(await auth_controller.register(potentialUserData))
    } catch (error) {
        next(error);
    }
});
// Attempt to log in 
router.post(AuthURLS.loginApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userData = request.body;
        const verifiedUser = await auth_controller.verifyingUser(userData);
        if (!verifiedUser) {
            throw new Error("user not verified")
        }
        if (verifiedUser) {
            const token = await authService.createJWT(verifiedUser);
            response.set("authorization", `Bearer ${token}`)
            response.status(200).json(verifiedUser)
        }
    } catch (error) {
        next(error)
    }
});
// will check the validation of the token from the client
router.get(AuthURLS.checkJwtApi, jwtMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const validToken = request.headers.authorization;
        const verifiedUser = request.body.data;
        console.log(verifiedUser);
        response.set("authorization", `${validToken}`);
        response.status(200).json(verifiedUser);
    } catch (error) {
        next(error)
    }
});

export default router;
