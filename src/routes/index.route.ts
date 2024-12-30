import { Router } from "express";
import UserRouter from "./user.routes";
import AuthRouter from "./auth.routes";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

export default router;