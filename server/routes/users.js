import { Router } from 'express';
import { findUserById } from '../models/users.js';


const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user || user.length == 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
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
