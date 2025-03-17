import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    year: integer('year').notNull(),
});
