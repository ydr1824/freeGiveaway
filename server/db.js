import dotenv from 'dotenv';
import { drizzle }  from "drizzle-orm/postgres-js";
import * as schema from './drizzle/schema.js'; 
import { sql, eq } from 'drizzle-orm';
import Client from 'postgres'
dotenv.config();
let client;
client = Client(process.env.DATABASE_URL)


function toBool(value) {
    if (typeof value === 'boolean') {
        return value; // Return the boolean as is
    } else if (typeof value === 'string') {
        const lowerStr = value.toLowerCase();
        if (lowerStr === 'true') {
            return true; // Return true for string "true"
        } else if (lowerStr === 'false') {
            return false; // Return false for string "false"
        }
    }
    return undefined; // Return undefined for other types (e.g., null, undefined, numbers, objects)
}


const db = drizzle(client,{ logger: true });

export const { users, categories, conditions, posts, comments, postcategories, items, requests, messages } = schema;
export { eq,db,sql };
