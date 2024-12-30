import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.config";

export const generateAccessToken = (userId: string) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
		expiresIn: "1m",
	});
};

export const generateRefreshToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

export const verifyRefreshToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
			userId?: string;
		};
		return decoded.userId || null;
	} catch (error) {
		return null;
	}
};
