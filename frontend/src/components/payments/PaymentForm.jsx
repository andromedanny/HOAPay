import { useState, useEffect } from 'react';
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
  Box,
  Alert
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import api from '../../services/api';

export default function PaymentForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'gcash',
    paymentType: 'monthly_dues',
    dueDate: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const paymentMethods = [
    { value: 'gcash', label: 'GCash' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const paymentTypes = [
    { value: 'monthly_dues', label: 'Monthly Dues', defaultAmount: 500 },
    { value: 'sticker', label: 'Vehicle Sticker', defaultAmount: 100 },
    { value: 'other', label: 'Other', defaultAmount: 0 }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || isNaN(formData.amount)) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Please select a due date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const paymentData = {
        amount: parseFloat(formData.amount),
        payment_method: formData.paymentMethod,
        payment_plan: formData.paymentType,
        due_date: formData.dueDate ? formData.dueDate.format('YYYY-MM-DD') : null
      };

      console.log('Submitting payment:', paymentData);
      const response = await api.post('/payments', paymentData);
      console.log('Payment response:', response.data);

      onSuccess('Payment submitted successfully!');
      onClose();
    } catch (err) {
      console.error('Payment submission failed:', err);
      setSubmitError(err.response?.data?.error || 'Failed to submit payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'paymentType') {
      const selectedType = paymentTypes.find(type => type.value === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        amount: selectedType.defaultAmount.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: '450px'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: 'center',
          borderBottom: '1px solid #e0e0e0',
          pb: 2,
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        Make Payment
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent 
          sx={{ 
            py: 3,
            px: 3
          }}
        >
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                label="Payment Type"
              >
                {paymentTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label} - ₱{type.defaultAmount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: <Typography>₱</Typography>
              }}
            />

            <FormControl fullWidth>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={formData.dueDate}
                onChange={(newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    dueDate: newValue ? newValue : null
                  }));
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!errors.dueDate} helperText={errors.dueDate} />
                )}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>

        <DialogActions 
          sx={{ 
            px: 3,
            py: 2,
            borderTop: '1px solid #e0e0e0',
            gap: 1
          }}
        >
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ flex: 1 }}
          >
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
