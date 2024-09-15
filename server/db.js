import dotenv from 'dotenv';
import { drizzle }  from "drizzle-orm/postgres-js";
import * as schema from './drizzle/schema.js'; 
import { sql, eq, and } from 'drizzle-orm';
import Client from 'postgres'
dotenv.config();
let client;
client = Client(process.env.DATABASE_URL)

function toBool(value) {
    if (value === true) {
        return true; // Return true for boolean true
    } else if (value === false) {
        return false; // Return false for boolean false
    } else if (typeof value === 'string') {
        const lowerStr = value.toLowerCase();
        if (lowerStr === 'true') {
            return true; // Return true for string "true"
        } else if (lowerStr === 'false') {
            return false; // Return false for string "false"
        }
    }
    return undefined; // Return undefined for all other cases
}
const db = drizzle(client,{ logger: true });

export const { users, categories, conditions, posts, comments, postcategories, items, requests, messages } = schema;
export { eq,db,sql, and };
