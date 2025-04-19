import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box
} from '@mui/material';
import PaymentForm from '../components/payments/PaymentForm';
import api from '../services/api';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.get('/payments');
      setPayments(res.data);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Payment History</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowForm(true)}
        >
          Make Payment
        </Button>
      </Box>

      {showForm && (
        <PaymentForm 
          onClose={() => setShowForm(false)} 
          onSuccess={() => {
            setShowForm(false);
            fetchPayments();
          }} 
        />
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No payments found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}