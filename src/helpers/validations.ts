import { z } from "zod";

export const registerValidation = z.object({
	username: z
		.string({ message: "Username is required" })
		.min(3, "Username must be at least 3 characters long")
		.max(10, "Username must be at most 10 characters long"),
	email: z
		.string({ message: "Email address is required" })
		.email("Invalid email format"),
	password: z
		.string({ message: "Password is required" })
		.min(8, "Password must be at least 8 characters long"),
});

export const loginValidation = z.object({
	email: z
		.string({ message: "Email address is required" })
		.email("Invalid email format"),
	password: z
		.string({ message: "Password is required" })
		.min(8, "Password must be at least 8 characters long"),
});

export type registerValidation = z.infer<typeof registerValidation>;
export type loginValidation = z.infer<typeof loginValidation>;
