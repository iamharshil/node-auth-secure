import type { Document, Types } from "mongoose";

export type RefreshToken = {
	readonly user: Types.ObjectId;
	token: string;
	expiresAt: Date;
	revokedAt?: Date;
	ipAddress: string;
};

export interface RefreshTokenDocument extends RefreshToken, Document {
	createdAt: Date;
	updateAt: Date;
}
