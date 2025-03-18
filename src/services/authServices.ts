import pool from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret123";

export const registerUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [username, hashedPassword]
        );
        return { success: true, message: "Registrasi berhasil" };
    } catch (error) {
        return { success: false, message: "Username sudah digunakan" };
    }
};

export const loginUser = async (username: string, password: string) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user) return { success: false, message: "User tidak ditemukan" };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, message: "Password salah" };

    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "24h" }
    );

    return {
        success: true,
        message: "Login berhasil",
        token,
        user: { id: user.id, username: user.username }
    };
};
