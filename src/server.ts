import http from "node:http";
import app from "./app";
import connectDB from "./config/database";
import { PORT } from "./config/index.config";

const server = http.createServer(app);

server.listen(PORT, async () => {
	await connectDB();
	console.log(`> Server is listening on port ${PORT}`);
});
