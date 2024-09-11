//import { createRequire } from "module";
//const require = createRequire(import.meta.url);

import { Router } from 'express';
import { createUser, findUserById } from '../models/users.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    let msg = err.message;
    if (msg.includes("Users_email_unique")) {
      msg = "User already exists"
    }
    res.status(400).json({ message: msg });
  }
});

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

export default router;
