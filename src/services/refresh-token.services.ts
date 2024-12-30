import RefreshTokenModel from "../models/refresh-token.model";
import type { RefreshToken } from "../types/refresh-token.type";

const RefreshTokenService = {
	createRefreshToken: async (data: RefreshToken) => {
		return await RefreshTokenModel.create(data);
	},
	getByToken: async (token: string) => {
		return await RefreshTokenModel.findOne({ token })
			.populate("user")
			.exec();
	},
};

export default RefreshTokenService;
