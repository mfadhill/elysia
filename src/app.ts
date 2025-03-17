import { Elysia } from "elysia";
import { authRoutes } from "./routes/authRoute";
import { bookRoutes } from "./routes/bookRoute";

const app = new Elysia()
  .use(authRoutes)
  .use(bookRoutes)
  .get("/", () => "Welcome to Elysia.js Auth API")
  .listen(3000);


console.log("http://localhost:3000");
