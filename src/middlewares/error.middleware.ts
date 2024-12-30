import type { NextFunction, Response } from "express";

interface Error {
	stack?: string;
	statusCode?: number;
	errors?: Record<string, unknown>;
	message?: string;
}

export default function errorHandler(
	err: Error,
	_req: unknown,
	res: Response,
	_next: NextFunction,
) {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || "Something went wrong!",
	});

	// if (err.name === "ValidationError") {
	//     return res.status(400).json({ message: "Validation error!", errors: err.errors });
	// }

	// if (err.name === "CastError") {
	//     return res.status(400).json({ message: "Invalid ID!" });
	// }
}
