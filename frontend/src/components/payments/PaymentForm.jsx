import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid
} from '@mui/material';
import api from '../../services/api';

export default function PaymentForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'gcash',
    billingPeriod: '',
    memo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { value: 'gcash', label: 'GCash' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const billingPeriods = [
    { value: '2023-10', label: 'October 2023' },
    { value: '2023-11', label: 'November 2023' },
    { value: '2023-12', label: 'December 2023' }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || isNaN(formData.amount)) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.billingPeriod) {
      newErrors.billingPeriod = 'Please select a billing period';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.post('/payments', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Payment submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Make Payment</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount}
                InputProps={{
                  startAdornment: <Typography>₱</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Payment Method"
                >
                  {paymentMethods.map(method => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Billing Period</InputLabel>
                <Select
                  name="billingPeriod"
                  value={formData.billingPeriod}
                  onChange={handleChange}
                  label="Billing Period"
                  error={!!errors.billingPeriod}
                >
                  {billingPeriods.map(period => (
                    <MenuItem key={period.value} value={period.value}>
                      {period.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.billingPeriod && (
                  <Typography color="error" variant="caption">
                    {errors.billingPeriod}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Memo (Optional)"
                name="memo"
                multiline
                rows={3}
                value={formData.memo}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}