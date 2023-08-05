import { PrismaClient } from "@prisma/client";
import PrismaPostServices from "../services/post_services";
import PostModel from "../models/post_model";
import { v2 as cloudinary } from 'cloudinary';
const dotenv = require('dotenv').config();

const prisma = new PrismaClient();
const service = new PrismaPostServices(prisma)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
    api_key: process.env.CLOUDINARY_API_KEY || "",
    api_secret: process.env.CLOUDINARY_API_SECRET || "",
    // secure: true //true for https connection and false otherwise (default is true). Set it based
});

const uploadImage = async (image: any) => {
    const uploadedImage = await cloudinary.uploader.upload(image, {
        allowed_formats: ['png', 'jpg', 'jpeg','svg', 'ico', 'jfif', 'webp']
    });
    return uploadedImage;
}
// logic

//create
const createPost = async (secure_url: string, postData:PostModel, author_id: string) => {
    if (!secure_url) {
        throw new Error("securedURL did not received")
    } 
    if (!author_id) {
        throw new Error("unknown author_id , did not received");
    }
    await service.createPost(secure_url, postData, author_id)
}

const handleLike = async (postID: string, likeAuthor: string) => {
    return await service.handleLike(postID, likeAuthor);
}

const createComment = async (postID: string, commentAuthor: string, comment: string) => {
    return await service.createComment(postID, commentAuthor, comment);
}

const cloudImageUpload = async (image: any) => {
    const uploadedImage = await uploadImage(image);
    // console.log(uploadedImage);
    return uploadedImage
}
//read
const getAllPosts = async () => {
    const allPosts = await service.getAllPosts();
    return allPosts
}

const getUserPosts = async (user_id: string) => {
    const userPosts = await service.getUserPosts(user_id);
    return userPosts
}
//update
//delete
const deleteAllPosts = async () => {
    await service.deleteAllPosts()
}

export default {
    createPost,
    handleLike,
    createComment,
    cloudImageUpload,
    getAllPosts,
    getUserPosts,
    deleteAllPosts
}