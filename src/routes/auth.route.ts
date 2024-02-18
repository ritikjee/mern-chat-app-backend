import { Router } from "express";
import { getUserDetail, login, register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user/me", getUserDetail);

export default authRouter;
