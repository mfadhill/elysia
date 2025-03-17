import { registerUser, loginUser } from "../services/authServices";

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
    return await loginUser(body.username, body.password);
};

