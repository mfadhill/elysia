import { registerUser, loginUser } from "../services/authServices";

import jwt from "jsonwebtoken";

export const register = async ({ body }: { body: { username: string; password: string } }) => {
    if (!body.username || !body.password) {
        return { success: false, message: "Username dan password harus diisi" };
    }
    return await registerUser(body.username, body.password);
};


export const login = async ({ body }: { body: { username: string; password: string } }) => {
    if (!body.username || !body.password) {
        return { success: false, message: "Username dan password harus diisi" };
    }

    const result = await loginUser(body.username, body.password);

    if (!result.success) {
        return result;
    }

    const token = jwt.sign(
        { id: result.user.id, username: result.user.username },
        "secret123",
        { expiresIn: "1h" }
    );

    return { success: true, token };
};


