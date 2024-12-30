import "dotenv-safe/config";
import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
	PORT: port({ default: 4000 }),
	BASE_API_PATH: str({ default: "/api" }),
	BASE_URL: str({ default: "http://localhost:3000" }),
	MONGODB_URI: str(),
	JWT_SECRET: str(),
	BCRYPT_SECRET: str(),
});

export const PORT = env.PORT;
export const BASE_API_PATH = env.BASE_API_PATH;
export const BASE_URL = env.BASE_URL;
export const MONGODB_URI = env.MONGODB_URI;
export const JWT_SECRET = env.JWT_SECRET;
export const BCRYPT_SECRET = env.BCRYPT_SECRET;
