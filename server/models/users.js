import { db, users } from '../db.js';
import { sql } from 'drizzle-orm';
export async function createUser(userData) {
  const { email, password, firstName, lastName, address, phone } = userData;
  //console.log(userData)
  let name = `${firstName} ${lastName}`;
  const user = await db.insert(users).values({
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
    .where(sql`${users.id} = ${id}`) 
    .execute();
  return user;
}
