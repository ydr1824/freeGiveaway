import { Router } from 'express';
import { createUser, verifyUser ,login} from '../models/register.js'; // Import verifyUser


const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body, res); // Pass res to createUser
    // If createUser returns a response, it will be sent here
  } catch (err) {
    let msg = err.message;
    console.error(error);
    res.status(400).json({ message: msg });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const verifiedUser = await verifyUser(token); 
    if (!verifiedUser) {
      return res.status(400).json({ message: 'Invalid verification token.' });
    }
    res.status(200).json({ message: 'Email verified successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



const NODE_ENV = process.env.NODE_ENV || 'production' ;
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV,
      maxAge: 3600000 // 1 hour
    });

    // Return user information (excluding password)
    res.json({ user });
  } catch (err) {
    let msg = err.message;
    if (msg.includes("User not found")) {
      return res.status(404).json({ message: msg });
    }
    res.status(500).json({ message: msg });
  }
});
export default router;
