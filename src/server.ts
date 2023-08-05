// Load environment variables
import express, { Request, Response } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './utils/config';
import user_routes from './routes/user_routes';
import post_routes from './routes/post_routes';
import auth_routes from './routes/auth_routes';
import errorHandler from './middlewares/error_handler';
import path from 'path';

// creating a server
const server = express();

const corsOptions = {
    exposedHeaders: "authorization",
};
server.use(cors(corsOptions));

//TODO :enable a middleware

server.use(fileUpload({
    createParentPath: true
}));


// makes every data transfer as JSON data
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

server.use("/user", user_routes);
server.use("/post", post_routes);
server.use("/auth", auth_routes);
server.get('*', (request: Request, response: Response) => {
    response.status(504).json("what to do ? failed");
});
server.use(errorHandler);

// uploading server with matching PORT 
const currentPort = config.port;
const liveBackendURL = config.liveBackendPort
console.log(liveBackendURL);

server.listen("https://connections-backend.onrender.com", () => {
    console.log(`listening on ${liveBackendURL}`)
})