import { db } from "../db";
import { books } from "../schema";
import { eq } from "drizzle-orm";

export const getAllBooks = async () => {
  return await db.select().from(books);
};

export const getBookById = async (id: number) => {
  const result = await db.select().from(books).where(eq(books.id, id));
  return result[0] || null;
};

export const createBook = async (data: { title: string; author: string; year: number }) => {
  await db.insert(books).values(data);
  return { message: "Book created successfully" };
};

export const updateBook = async (id: number, data: Partial<{ title: string; author: string; year: number }>) => {
  await db.update(books).set(data).where(eq(books.id, id));
  return { message: "Book updated successfully" };
};

export const deleteBook = async (id: number) => {
  await db.delete(books).where(eq(books.id, id));
  return { message: "Book deleted successfully" };
};
