import { Elysia } from "elysia";
import { register, login, logout } from "../controllers/authController";
import { authMiddleware } from "../middlewares/middleware";

export const authRoutes = new Elysia()
    .post("/register", register)
    .post("/login", login)
    .post("/logout", authMiddleware, logout);
