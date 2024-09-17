import { Router } from 'express';
import { login } from '../models/login.js';
import { setCookie } from '../middlewares.js';

const router = Router();





router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    setCookie(res, token);
    res.json({ user });
  } catch (err) {
    let msg = err.message;
    res.status(500).json({ message: msg });
  }
});
export default router;
