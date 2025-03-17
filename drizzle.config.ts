import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'elysia',
  },
} satisfies Config;
