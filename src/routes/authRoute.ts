import { Elysia } from "elysia";
import { register, login } from "../controllers/authController";

export const authRoutes = new Elysia()
    .post("/register", register)
    .post("/login", login);
