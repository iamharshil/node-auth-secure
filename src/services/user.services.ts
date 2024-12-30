import NodeCache from "node-cache";
import UserModel from "../models/user.model";
import type { User, UserDocument } from "../types/user.type";
import logger from "../utils/logger";

const userCache = new NodeCache({ stdTTL: 600 });

const UserService = {
	getUsers: async () => {
		try {
			const cachedUsers = userCache.get("users");
			if (cachedUsers) {
				return cachedUsers;
			}
			const users = await UserModel.find().exec();
			userCache.set("users", users);
			return users;
		} catch (error) {
			logger.info("🚀 ~ getUsers ~ error", error);
			throw new Error("Failed to fetch users");
		}
	},
	getUserById: async (id: string) => {
		try {
			const cachedUser = userCache.get(id);
			if (cachedUser) {
				return cachedUser;
			}
			const user = await UserModel.findById<UserDocument | null>(
				id,
			).exec();
			if (user) {
				userCache.set(id, user);
			}
			return user;
		} catch (error) {
			logger.info("🚀 ~ getUserById ~ error", error);
			throw new Error("Failed to fetch user");
		}
	},
	getUserByEmail: async (email: string, select = "") => {
		try {
			return await UserModel.findOne<User | null>({ email })
				.select(select)
				.exec();
		} catch (error) {
			logger.info("🚀 ~ getUserByEmail ~ error", error);
			throw new Error("Failed to fetch user");
		}
	},
	createUser: async (user: User) => {
		try {
			const newUser = await UserModel.create(user);
			if (newUser) {
				userCache.del("users");
			}
			return newUser;
		} catch (error) {
			logger.info("🚀 ~ createUser ~ error", error);
			throw new Error("Failed to create user");
		}
	},
	updateUser: async (id: string, data: Partial<User>) => {
		try {
			const updatedUser = await UserModel.findByIdAndUpdate<UserDocument>(
				id,
				data,
				{ new: true },
			).exec();
			if (updatedUser) {
				userCache.del(id);
				userCache.del("users");
			}
			return updatedUser;
		} catch (error) {
			logger.info("🚀 ~ updateUser ~ error", error);
			throw new Error("Failed to update user");
		}
	},
	deleteUser: async (id: string) => {
		try {
			const deletedUser = await UserModel.findByIdAndDelete(id).exec();
			if (deletedUser) {
				userCache.del(id);
				userCache.del("users");
			}
			return deletedUser;
		} catch (error) {
			logger.info("🚀 ~ deleteUser ~ error", error);
			throw new Error("Failed to delete user");
		}
	},
};

export default UserService;
