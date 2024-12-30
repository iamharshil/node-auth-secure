import type { Types } from "mongoose";

export type User = {
	readonly _id?: Types.ObjectId;
	username: string;
	email: string;
	password: string;
};

export interface UserDocument extends User, Document {
	readonly _id: Types.ObjectId;
	createdAt: Date;
	updateAt: Date;
}
