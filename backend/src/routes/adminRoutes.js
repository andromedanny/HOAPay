
import express from 'express';
import { getAllUsers } from '../controllers/userController.js';
import authenticate from '../middleware/authenticate.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import User from '../models/Users.js';
const router = express.Router();




router.get('/users', authenticate, authorizeAdmin, getAllUsers);

router.delete('/users/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
// Update user
router.put('/users/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.post('/users', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, address } = req.body;

    if (!email || !password || !firstName || !lastName || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
export default router;
