import { Router } from 'express';
import { createUser, verifyUser } from '../models/register.js'; // Import verifyUser

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
export default router;
