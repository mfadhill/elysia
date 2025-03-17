import { Elysia } from "elysia";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController";

export const bookRoutes = new Elysia({ prefix: "/books" })
    .get("/", async () => {
        const data = await getAllBooks();
        return { data };
    })
    .get("/:id", async ({ params }) => {
        const data = await getBookById(Number(params.id));
        if (!data) return { message: "Book not found" };
        return { data };
    })
    .post("/", async ({ body }: { body: { title: string; author: string; year: number } }) => {
        const { title, author, year } = body;
        if (!title || !author || !year) return { message: "Incomplete data" };
        return await createBook({ title, author, year });
    })
    .put("/:id", async ({ params, body }: { params: { id: string }, body: Partial<{ title: string; author: string; year: number }> }) => {
        return await updateBook(Number(params.id), body);
    })

    .delete("/:id", async ({ params }) => {
        return await deleteBook(Number(params.id));
    });
