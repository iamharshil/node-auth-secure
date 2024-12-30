import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.config";
import { loginValidation, registerValidation } from "../helpers/validations";
import RefreshTokenService from "../services/refresh-token.services";
import UserService from "../services/user.services";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/token.utils";

export const register = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const validation = registerValidation.safeParse(data);
		if (!validation.success) {
			res.status(400).json({ error: validation.error });
			return;
		}
		const salt = bcrypt.genSaltSync(15);
		const password = bcrypt.hashSync(data.password, salt);
		const user = await UserService.createUser({ ...data, password });
		res.status(201).json({ data: user });
	} catch (error) {
		console.log("🚀 ~ register ~ error:", error);
		res.status(500).json({ error: "Internal server error!" });
		return;
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const data = req.body;
		const validate = loginValidation.safeParse(data);
		if (!validate.success) {
			res.status(400).json({ error: validate.error });
			return;
		}

		const user = await UserService.getUserByEmail(data.email, "+password");
		if (!user?._id) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		const isPasswordValid = bcrypt.compareSync(
			data.password,
			user.password,
		);
		if (!isPasswordValid) {
			res.status(401).json({ error: "Invalid password" });
			return;
		}

		const accessToken = generateAccessToken(user._id.toString());
		const refreshToken = generateRefreshToken();
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		const refToken = await RefreshTokenService.createRefreshToken({
			token: refreshToken,
			user: user._id,
			expiresAt,
			ipAddress: req.ip || "",
		});
		if (!refToken) {
			res.status(500).json({ error: "Internal server error!" });
			return;
		}

		res.cookie("refresh-token", refreshToken, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});
		res.cookie("access-token", accessToken, {
			maxAge: 1 * 60 * 1000, // 15 minutes
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.log("🚀 ~ login ~ error:", error);
		res.status(500).json({ error: "Internal server error!" });
	}
};
