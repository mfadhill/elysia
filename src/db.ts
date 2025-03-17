import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'elysia',
  password: 'admin',
  port: 5432,
});

export const db = drizzle(pool);
export default pool;
