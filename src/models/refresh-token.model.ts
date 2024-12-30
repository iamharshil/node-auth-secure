import { Schema, model } from "mongoose";
import type { RefreshToken } from "../types/refresh-token.type";

const refreshTokenSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		token: { type: String, required: true },
		expiresAt: { type: Date, required: true },
		revokedAt: { type: Date, default: null },
		ipAddress: { type: String },
	},
	{
		timestamps: true,
	},
);

refreshTokenSchema.index({ user: 1 });
refreshTokenSchema.index({ token: 1 });

const RefreshTokenModel = model<RefreshToken>(
	"RefreshToken",
	refreshTokenSchema,
);
export default RefreshTokenModel;
