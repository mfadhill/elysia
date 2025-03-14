import { Elysia } from "elysia";
import { authRoutes } from "./routes/authRoute";

const app = new Elysia()
  .use(authRoutes)
  .get("/", () => "Welcome to Elysia.js Auth API")
  .listen(3000);

console.log("Server berjalan di http://localhost:3000");
