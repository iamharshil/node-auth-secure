import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import UserService from "../services/user.services";

export const getUsers = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await UserService.getUsers();
		res.status(200).json({ data: users });
	} catch (error) {
		res.status(500).json({ error: "Internal server error!" });
		return;
	}
};
