import { Context } from "elysia";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret123";
export const authMiddleware = (app: any) =>
    app.derive(async ({ request, set }: Context) => {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            set.status = 401;
            return { message: "Unauthorized" };
        }
        const token = authHeader.split(" ")[1];
        try {
            const user = jwt.verify(token, SECRET_KEY);
            return { user };
        } catch (error) {
            set.status = 403;
            return { message: "Invalid token" };
        }
    });
