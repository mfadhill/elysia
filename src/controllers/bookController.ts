import pool, { db } from "../db";
import { books } from "../schema";
import { eq } from "drizzle-orm";

export const getAllBooks = async () => {
    return await db.select().from(books);
};

export const getBookById = async (id: number) => {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0] || null;
};

export const createBook = async (data: { title: string; author: string; year: number; userId: number }) => {
    const inserted = await db.insert(books).values(data).returning();
    return inserted[0];
};


export const updateBook = async (
    id: number,
    data: Partial<{ title: string; author: string; year: number }>,
    userId: number
) => {
    const existing = await pool.query(
        "SELECT * FROM books WHERE id = $1 AND user_id = $2",
        [id, userId]
    );

    if (existing.rows.length === 0) return null;

    const { title, author, year } = { ...existing.rows[0], ...data };

    const result = await pool.query(
        "UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *",
        [title, author, year, id]
    );

    return result.rows[0]; // Return updated data
};

export const deleteBook = async (id: number, userId: number) => {
    const existing = await pool.query(
        "SELECT * FROM books WHERE id = $1 AND user_id = $2",
        [id, userId]
    );
    if (existing.rows.length === 0) return null;

    const result = await pool.query(
        "DELETE FROM books WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0]; // Return deleted data
};
