import { db, users } from '../db.js';
import { hashPW, signJWT, verifyJWT } from '../middlewares.js';
export async function createUser(userData, res) { // Add res as a parameter
  const { email, password, firstName, lastName, address, phone } = userData;
  const name = `${firstName} ${lastName}`;
  
  try {
    const hashedPassword = await hashPW(password);
    const user = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
      address,
      phone,
      verified: false // Assuming you want to set this initially as false
    }).returning();

    // Generate verification token
    const token = signJWT({ email });
    
    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600000 // 1 hour
    });

    // Return user information (excluding password)
    return res.status(201).json({ user: user[0] });
  } catch (err) {
    let msg = err.message;
    if (msg.includes("Users_email_unique")) {
      msg = "User already exists";
      return res.status(400).json({ message: msg });
  }
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Function to verify a user  , not implemented & not tested
export const verifyUser = async (token) => {
  try {
    const decoded = verifyJWT(token);
    const user = await db.select().from(users).where(users.email.eq(decoded.email)).execute();

    if (!user || user.length === 0) {
      throw new Error('User not found');
    }

    await db.update(users).set({ verified: true }).where(users.email.eq(decoded.email)).execute();
    return user[0];
  } catch (err) {
    throw new Error('Invalid verification token');
  }
};
