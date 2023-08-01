import { PrismaClient } from '@prisma/client'
import PrismaUserServices from '../services/user_services';
import UserModel from '../models/user_model';


const prisma = new PrismaClient();
const user_service = new PrismaUserServices(prisma);

// TODO: change any type 
const followUser = async (followedID: string, followingID: string) => {
    if(!followedID || !followingID) {
        throw new Error("data of users id's not provided ")
    }
    try {
        await user_service.followUser(followedID,followingID);
    } catch (error) {
        throw error
    }
}

const getAllUsers = async (user_id: string): Promise<object> => {
    const allUnfollowedUsers = await user_service.getAllUsers(user_id);
    return allUnfollowedUsers;
}


const getAllFollowedUsers = async (user_id: string): Promise<object> => {
    const allFollowedUsers = await user_service.getAllFollowedUsers(user_id)
    return allFollowedUsers;
}

const getUser = async (user: UserModel) => {
    const singleUser = await user_service.getUser(user)
    return singleUser
}

const getSingleUserByID = async (user_id: string) => {
    const singleUser = await user_service.getSingleUserByID(user_id)
    return singleUser

}

const getUserByUsername = async (username: string) => {
    const user = await user_service.getUserByUsername(username)
    return user
}

const getSingleUserFollowers = async (user_id: string) => {
    const singleUserFollowers = await user_service.getSingleUserFollowers(user_id);
    return singleUserFollowers
}

const getSingleUserFollowings = async (user_id: string) => {
    const singleUserFollowings = await user_service.getSingleUserFollowings(user_id);
    return singleUserFollowings
}

const deleteUser = async (user_id: string) => {
    // await user_service.deleteUser(user_id);
}

const unFollowUser = async (followedID: string, followingID: string) => {
    if(!followedID || !followingID) {
        throw new Error("data of users id's not provided ")
    }
    try {
        await user_service.unFollowUser(followedID,followingID);
    } catch (error) {
        throw error
    }
}

export default {
    followUser,
    getAllUsers,
    getAllFollowedUsers,
    getSingleUserFollowings,
    getUser,
    getSingleUserByID,
    getUserByUsername,
    getSingleUserFollowers,
    deleteUser,
    unFollowUser
}