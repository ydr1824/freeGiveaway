import dotenv from 'dotenv';
import { drizzle }  from "drizzle-orm/postgres-js";
import * as schema from './drizzle/schema.js'; 
import { sql, eq } from 'drizzle-orm';
import Client from 'postgres'
dotenv.config();
let client;
client = Client(process.env.DATABASE_URL)


const db = drizzle(client,{ logger: true });

export const { users, categories, conditions, posts, comments, postcategories, items, requests, messages } = schema;
export { eq,db,sql };
