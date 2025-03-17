import { Elysia } from "elysia";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController";
import { authMiddleware } from "../middlewares/auth";

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

    .use(authMiddleware)

    .post("/", async ({ body, user }) => {
        const { title, author, year } = body;
        if (!title || !author || !year) return { message: "Incomplete data" };

        const result = await createBook({ title, author, year, userId: user.id });
        return { message: "Book created", data: result };
    })

    .put("/:id", async ({ params, body, user, set }) => {
        const result = await updateBook(Number(params.id), { ...body }, user.id);
        if (!result) {
            set.status = 404;
            return { message: "Book not found or not yours" };
        }
        return { message: "Book updated", data: result };
    })


    .delete("/:id", async ({ params, user, set }) => {
        const result = await deleteBook(Number(params.id), user.id);
        if (!result) {
            set.status = 404;
            return { message: "Book not found or not yours" };
        }
        return { message: "Book deleted", data: result };
    });
