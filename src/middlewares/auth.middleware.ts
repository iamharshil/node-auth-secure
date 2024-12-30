import type { NextFunction, Request, Response } from "express";
import RefreshTokenService from "../services/refresh-token.services";
import UserService from "../services/user.services";
import type { UserDocument } from "../types/user.type";
import { generateAccessToken, verifyRefreshToken } from "../utils/token.utils";

export interface AuthenticatedRequest extends Request {
	user?: UserDocument;
}

const authMiddleware = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const cookies = req.cookies;
	const refreshToken = cookies["refresh-token"];
	const accessToken = cookies["access-token"];
	const ipAddress = req.ip || "";

	try {
		if (accessToken) {
			const verify = verifyRefreshToken(accessToken);
			if (verify) {
				const user = await UserService.getUserById(verify);
				req.user = user as unknown as UserDocument;
				next();
				return;
			}
		}

		const token = await RefreshTokenService.getByToken(refreshToken);
		if (
			!token ||
			token.revokedAt ||
			token.expiresAt < new Date() ||
			!token.user ||
			token?.ipAddress !== ipAddress
		) {
			res.status(401).json({ message: "Unauthorized" });
			res.clearCookie("refresh-token");
			return;
		}

		if (!token?._id) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		// generate access token
		const newAccessToken = generateAccessToken(token.user._id.toString());
		res.cookie("access-token", newAccessToken, {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		req.user = token.user as unknown as UserDocument;
		next();
		return;
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}
};

export default authMiddleware;
