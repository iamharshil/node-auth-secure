import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { getUsers } from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/", authMiddleware, getUsers);

export default UserRouter;