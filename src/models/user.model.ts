import { Schema, model } from "mongoose";

interface User extends Document {
	username: string;
	email: string;
	password: string;
}

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, maxlength: 10 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
	},
	{
		timestamps: true,
	},
);

const UserModel = model<User>("User", UserSchema);
export default UserModel;
