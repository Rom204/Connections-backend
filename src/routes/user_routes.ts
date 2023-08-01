import express, { Request, Response, NextFunction } from 'express';
import { UserURLS } from '../utils/urls';
import user_controller from '../controllers/user_controller';

// User related routes
const router = express.Router();

// ___________________________________________________________________________________
// create
router.get("/", async (request: Request, response: Response) => {
    response.status(200).json("user controller is working properly")
})

router.get(UserURLS.getSingleUserApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.params.id;
        response.status(202).json(await user_controller.getSingleUserByID(userID))
    } catch (error) {
        next(error)
    }
});

router.get(UserURLS.getUserByUsernameApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const username = request.body.username;
        response.status(202).json(await user_controller.getUserByUsername(username))
    } catch (error) {
        next(error);
    }
});

router.post(UserURLS.getAllUsersApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.body.id;
        console.log(userID)
        response.status(201).json(await user_controller.getAllUsers(userID))
    } catch (error) {
        next(error);
    }
});

router.delete(UserURLS.getSingleUserApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.params.id;
        response.status(202).json(await user_controller.deleteUser(userID))
    } catch (error) {
        next(error);
    }
});
// ___________________________________________________________________________________
// follow un-follow section
// for the feed page , we would like to retrieve only the posts of the users which our user is following after
router.post(UserURLS.getFollowedUsersPostsApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.body.id;
        console.log(userID)
        response.status(201).json(await user_controller.getAllFollowedUsers(userID))
    } catch (error) {
        next(error)
    }
});

// update and create a new follow collection in DB: a user followed another user
router.put(UserURLS.followUserApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followedUserID = request.body.followedUser
        const followingUserID = request.body.followingUser
        // check for valid input data here
        if (!followedUserID || !followingUserID) {
            throw new Error("did not received params")
        } else {
            response.status(202).json(await user_controller.followUser(followedUserID, followingUserID))
        }
    } catch (error) {
        next(error)
    }
});

// update the follow collection and remove in DB: a user unfollowed another user
router.put(UserURLS.unFollowUserApi, async (request: Request, response: Response, next: NextFunction) => {
    // console.log("unfollowing")
    try {
        const followedUserID = request.body.data.followedUser
        const followingUserID = request.body.data.followingUser
        // console.log("unfollowing,", followedUserID, followingUserID)
        // check for valid input data here
        if (!followedUserID || !followingUserID) {
            throw new Error("did not received params")
        } else {
            response.status(202).json(await user_controller.unFollowUser(followedUserID, followingUserID))
        }
    } catch (error) {
        next(error)
    }
});

// in order to display all the followers a user has 
router.get(UserURLS.getSingleUserFollowersApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.params.id;
        console.log(userID);
        response.status(202).json(await user_controller.getSingleUserFollowers(userID))
    } catch (error) {
        next(error)
    }
});

// in order to display all the users a user is following after 
router.get(UserURLS.getSingleUserFollowingsApi, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userID = request.params.id;
        console.log(userID);
        response.status(202).json(await user_controller.getSingleUserFollowings(userID))
    } catch (error) {
        next(error)
    }
});
export default router;