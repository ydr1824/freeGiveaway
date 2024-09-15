import { db, users, eq, and } from '../db.js';
import { sql } from 'drizzle-orm';
export async function createUser(userData) {
  const {id, email, password, firstName, lastName, address, phone } = userData;
  //console.log(userData)
  let name = `${firstName} ${lastName}`;
  const user = await db.insert(users).values({
    id,
    email,
    password,
    name,
    address,
    phone
  }).returning();
  return user;
}

export async function findUserById(id) {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`) // Using SQL template
    .execute();
  return user;
}

export async function login(email, password) {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password))) // Using SQL template
    .execute();
  return user;
}

