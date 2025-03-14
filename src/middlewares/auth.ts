import jwt from "jsonwebtoken";

const SECRET_KEY = "secret123";

export const authMiddleware = ({ request }: { request: Request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return { user };
    } catch (error) {
        return new Response("Token tidak valid", { status: 403 });
    }
};
