import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { BASE_API_PATH, BASE_URL } from "./config/index.config";
import errorHandler from "./middlewares/error.middleware";
import router from "./routes/index.route";

const app = express();

// Security middlewares
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
				objectSrc: ["'none'"],
				imgSrc: ["'self'", "data:"],
				styleSrc: ["'self'", "'unsafe-inline'"],
			},
		},
		referrerPolicy: { policy: "no-referrer" },
	}),
);
app.use(
	cors({
		origin: BASE_URL,
		credentials: true,
	}),
);
app.use(hpp());
app.use(ExpressMongoSanitize());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		message: "Too many requests, please try again after an hour",
	}),
);

// Logging and parsing middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// API routes
app.use(BASE_API_PATH, router);

// Error handling middleware
app.use(errorHandler);

export default app;
