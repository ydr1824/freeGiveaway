import { db, users, eq } from '../db.js';
import { checkPW, signJWT } from '../middlewares.js';



export async function login(email, password) {
  const user = await db
    .select({ id: users.id, email: users.email, password: users.password })
    .from(users)
    .where(eq(users.email, email))
    .execute();
  if (!user || user.length === 0) {
    throw new Error('User not found');
  }
  const storedUser = user[0];
  const id = storedUser.id;
  const isPasswordValid = await checkPW(password, storedUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = signJWT({ id });
  return { user: storedUser.id, token };
}