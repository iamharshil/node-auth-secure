import mongoose from "mongoose";
import { MONGODB_URI } from "./index.config";

const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI, {
			maxPoolSize: 10,
		});
		console.log("> MongoDB connected.!!");
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

mongoose.connection.on("disconnected", () => {
	console.error("> Lost MongoDB connection");
});

export default connectDB;
