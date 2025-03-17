import { pgTable, serial, text, integer, foreignKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
});

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    year: integer('year').notNull(),
    userId: integer('user_id')
        .references(() => users.id)
        .notNull(),
});
