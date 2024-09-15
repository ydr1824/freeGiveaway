import { pgTable, foreignKey, serial, integer, varchar, timestamp, text, boolean, unique } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	address: text("address"),
	phone: varchar("phone", { length: 20 }),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			Users_email_unique: unique("Users_email_unique").on(table.email),
		}
	});

export const requests = pgTable("requests", {
	id: serial("id").primaryKey().notNull(),
	itemid: integer("itemid").notNull(),
	userid: integer("userid").notNull(), // Changed to userid
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
			requests_userid_fkey: foreignKey({
				columns: [table.userid],
				foreignColumns: [users.id], // Reference to users.id
				name: "requests_userid_fkey"
			}),
		}
	});

export const items = pgTable("items", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	//condition_id: integer("condition_id"),
	condition_id: varchar("condition_id", { length: 255 }),
	category_id: integer("category_id"),
	user_id: integer("user_id").notNull(), // Ensure this is present
	image_url: varchar("image_url", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	expiry_date: timestamp("expiry_date", { mode: 'string' }),
	active: boolean("active").default(true).notNull(),
},
	(table) => {
		return {
			/*  items_condition_id_fkey: foreignKey({
				  columns: [table.condition_id],
				  foreignColumns: [conditions.id],
				  name: "items_condition_id_fkey"
			  }).onDelete("cascade"),*/
			items_category_id_fkey: foreignKey({
				columns: [table.category_id],
				foreignColumns: [categories.id],
				name: "items_category_id_fkey"
			}).onDelete("set null"),
			items_user_id_fkey: foreignKey({
				columns: [table.user_id],
				foreignColumns: [users.id], // Reference to users.id
				name: "items_user_id_fkey"
			}),
		}
	});

export const comments = pgTable("comments", {
	id: serial("id").primaryKey().notNull(),
	content: text("content").notNull(),
	postid: integer("postid").notNull(),
	user_id: integer("user_id").notNull(), // Changed authorid to user_id
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			comments_user_id_fkey: foreignKey({
				columns: [table.user_id],
				foreignColumns: [users.id], // Reference to users.id
				name: "comments_user_id_fkey"
			}),
		}
	});

export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content").notNull(),
	user_id: integer("user_id").notNull(), // Changed author_id to user_id
	created_at: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
	(table) => {
		return {
			posts_user_id_fkey: foreignKey({
				columns: [table.user_id],
				foreignColumns: [users.id], // Reference to users.id
				name: "posts_user_id_fkey"
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
