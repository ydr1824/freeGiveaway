import { db, users,sql } from '../db.js';
import { hashPW, signJWT } from '../middlewares.js'; 

export async function findUserById(id) {
  const user = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${id}`) 
    .execute();
  return user;
}

export async function login(email, password) {
  // Fetch the user by email
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email)) // Only check by email first
    .execute();

  if (!user || user.length === 0) {
    throw new Error('User not found');
  }
  const storedUser = user[0];

  // Verify the password
  const isPasswordValid = await hashPW(password, storedUser.password); // Adjust this line to your password verification logic
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = signJWT({ email });
  
  return { user: storedUser, token }; // Return user data and token
}