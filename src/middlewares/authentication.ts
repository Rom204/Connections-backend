import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from 'jsonwebtoken';
require("dotenv").config();


interface UserDataProps {
    id: string;
    username: string;
    role: string;
}

export const jwtMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;
    // console.log(token + "token received");

    if (!token) {
        return response.status(404).json({ message: "No token provided" })
    }
    if (token) {
        const tokenData = token?.split(" ")[1];
        const secret_key = process.env.SECRET_ACCESS_TOKEN;

        if (!secret_key) {
            return response.status(500).json({ message: 'Secret key not to be found - check .env' })
        } else {
            try {
                let userData = {
                    id: "",
                    username: "",
                    role: ""
                }

                // checking if jwt is valid, return encrypted user data if valid
                userData = jwt.verify(tokenData, secret_key) as UserDataProps;
                request.headers.authorization = token;
                request.body = userData;
                next();

            } catch (error: any) {
                if (error instanceof TokenExpiredError) {
                    console.log("token needs to be refreshed....")
                    const userData = jwt.decode(tokenData) as UserDataProps;
                    const refreshedToken = jwt.sign({ userData }, secret_key, {
                        expiresIn: "1h",
                    });
                    request.headers.authorization = refreshedToken;
                    request.body = userData;
                    next();

                } else if (error.name === "JsonWebTokenError") {
                    console.log(error);
                    return response.status(404).json(error);
                } else {
                    throw error;
                }
            }
        }
    }
}
