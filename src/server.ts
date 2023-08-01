// Load environment variables
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './utils/config';
import user_routes from './routes/user_routes';
import post_routes from './routes/post_routes';
import auth_routes from './routes/auth_routes';
import errorHandler from './middlewares/error_handler';

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

server.use(errorHandler);

// uploading server with matching PORT 
const currentPort = config.port;

server.listen(currentPort, () => {
    console.log(`listening on http://localhost:${currentPort}`)
})