// routes/paymentRoutes.js
import express from 'express';
import Payment from '../models/paymentModels.js';
import { User } from '../models/index.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// Get payment history for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.user.id },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Get all payments (admin only)
router.get('/all', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const payments = await Payment.findAll({
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(payments);
  } catch (err) {
    console.error('Error fetching all payments:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Update payment status (admin only)
router.put('/:id/status', authenticate, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.update({
      status,
      rejectionReason: rejectionReason || null
    });

    res.json(payment);
  } catch (err) {
    console.error('Error updating payment status:', err);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Route to handle payment creation
router.post('/', authenticate, async (req, res) => {
  try {
    const { 
      amount, 
      payment_method, 
      payment_plan, 
      due_date
    } = req.body;

    // Validate incoming data
    if (!amount || !payment_method || !payment_plan || !due_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new payment entry in the database
    const payment = await Payment.create({
      userId: req.user.id,
      amount: parseFloat(amount),
      paymentMethod: payment_method,
      paymentPlan: payment_plan,
      dueDate: due_date,
      status: 'pending',
      lateFee: 0.00,
      penalty: 0.00
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ error: 'Error creating payment' });
  }
});

export default router;
