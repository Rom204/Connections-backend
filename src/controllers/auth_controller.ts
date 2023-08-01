import { PrismaClient } from "@prisma/client";
import UserModel from "../models/user_model";
import AuthServices from "../services/auth_services"
import PrismaUserServices from "../services/user_services";

const prisma = new PrismaClient();
const user_service = new PrismaUserServices(prisma);
const authService = new AuthServices(prisma);


const register = async (potentialUserData: UserModel) => {
    const { username, password, email } = potentialUserData;

    if(!username || !password || !email) {
        throw new Error("username, password or email are missing")
    }
    try {
        const isUserExists = await user_service.getUserByUsername(username);
        if (isUserExists) {
            throw new Error("this username is already taken")
        }
        const isEmailExists = await user_service.getUserByEmail(email);
        if (isEmailExists) {
            throw new Error("this email already exists")
        } else {
            await authService.createUser(potentialUserData)
        }
    } catch (error) {
        throw error
    }
}

const verifyingUser = async (potentialUser: UserModel) => {
    console.log(potentialUser)
    const { username, password } = potentialUser;

    if(!username || !password) {
        throw new Error("username or password are missing")
    }

    const verifiedUser = await user_service.getUserByUsername(potentialUser.username);
    if (!verifiedUser) {
        throw new Error(`No such account with the given credentials`)
    }

    const expectedPassword = await authService.comparePassword(potentialUser.password, verifiedUser.password)
    if (!expectedPassword) {
        throw new Error("invalid password")
    }

    if (expectedPassword) {
        return verifiedUser
    }
}

const checkLogin = (data: object) => {
    // maybe combine between verifyingUser and createJwt functions and implement the logic here
    // TODO implement login validation logic here.
    // authService.
}

export default {
    register,
    verifyingUser,
    checkLogin
}