import { pgTable, foreignKey, serial, integer, varchar, timestamp, text, unique,boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
//import { boolean } from "drizzle-orm/mysql-core";




export const requests = pgTable("requests", {
	id: serial("id").primaryKey().notNull(),
	itemid: integer("itemid").notNull(),
	userid: integer("userid").notNull(),
	status: varchar("status", { length: 50 }).default('pending'),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			requests_itemid_fkey: foreignKey({
				columns: [table.itemid],
				foreignColumns: [items.id],
				name: "requests_itemid_fkey"
			}),
		}
	});


export const items = pgTable("items", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	condition_id: integer("condition_id"),
	category_id: integer("category_id"),
	user_id: integer("user_id").notNull(),
	image_url: varchar("image_url", { length: 255 }),
	active: boolean("active").default(true).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	expiry_date: timestamp("expiry_date", { mode: 'string' }),
},
	(table) => {
		return {
			items_condition_id_fkey: foreignKey({
				columns: [table.condition_id],
				foreignColumns: [conditions.id],
				name: "items_condition_id_fkey"
			}).onDelete("cascade"),
			items_category_id_fkey: foreignKey({
				columns: [table.category_id],
				foreignColumns: [categories.id],
				name: "items_category_id_fkey"
			}).onDelete("set null"),
		}
	});

export const users = pgTable("users", {
	id: integer("id").primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	address: text("address").notNull(),
	phone: varchar("phone", { length: 20 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			Users_email_unique: unique("Users_email_unique").on(table.email),
		}
	});

export const comments = pgTable("comments", {
	id: serial("id").primaryKey().notNull(),
	content: text("content").notNull(),
	postid: integer("postid").notNull(),
	authorid: integer("authorid").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
});

export const postcategories = pgTable("postcategories", {
	postid: integer("postid").notNull(),
	categoryid: integer("categoryid").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			postcategories_categoryid_fkey: foreignKey({
				columns: [table.categoryid],
				foreignColumns: [categories.id],
				name: "postcategories_categoryid_fkey"
			}),
		}
	});

export const categories = pgTable("categories", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			categories_name_key: unique("categories_name_key").on(table.name),
		}
	});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").notNull(),
	author_id: integer("author_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			Posts_author_id_Users_id_fk: foreignKey({
				columns: [table.author_id],
				foreignColumns: [users.id],
				name: "Posts_author_id_Users_id_fk"
			}),
		}
	});

export const conditions = pgTable("conditions", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			conditions_name_key: unique("conditions_name_key").on(table.name),
		}
	});