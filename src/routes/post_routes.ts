import express, { Request, Response, NextFunction } from "express";
import { CommentURLS, LikeURLS, PostURLS } from "../utils/urls";
import post_controller from "../controllers/post_controller";

const router = express.Router();


//Routes

//create
router.post(PostURLS.createPostApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const author_id = request.params.id;
        const post_data = request.body;
        const image = request.body.image;

        const uploadImage = await post_controller.cloudImageUpload(image);
        // console.log("final stage:", uploadImage)
        const cloudImageURL = uploadImage.secure_url;
        response.status(200).json(await post_controller.createPost(cloudImageURL, post_data, author_id))
    } catch (error) {
        next(error)
    }
})

router.put(LikeURLS.handleLikeApi, async (request: Request, response: Response, next: NextFunction) => {
    const postID = request.body.postID;
    const likeAuthor = request.body.likeAuthor;
    console.log("creating like: ", postID, likeAuthor)

    try {
        response.status(200).json(await post_controller.handleLike(postID, likeAuthor))
    } catch (error) {
        response.status(409).json(error)
    }
})

router.post(CommentURLS.createCommentApi, async (request: Request, response: Response, next: NextFunction) => {
    const postID = request.body.postID;
    const commentAuthor = request.body.commentAuthor;
    const comment = request.body.comment["comment"]
    console.log("creating comment: ", postID, commentAuthor, comment)

    try {
        response.status(200).json(await post_controller.createComment(postID, commentAuthor, comment))
    } catch (error) {
        response.status(409).json(error)
    }
})

//read
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(200).json("posts router is working properly")
    } catch (error) {
        next(error)
    }
})


router.get(PostURLS.getAllPostsApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(201).json(await post_controller.getAllPosts())
    } catch (error) {
        next(error)
    }
})
//update
//delete
router.delete(PostURLS.deleteAllPostsApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        response.status(204).json(await post_controller.deleteAllPosts())
    } catch (error) {
        next(error)
    }
})

export default router;

