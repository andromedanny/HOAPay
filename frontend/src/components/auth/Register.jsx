import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import api from '../../services/api';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    unitNumber: '',
    propertyType: 'condo',
    role: 'homeowner'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Account created!');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.error || 'Failed to register');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth name="firstName" label="First Name" onChange={handleChange} margin="normal" required />
          <TextField fullWidth name="lastName" label="Last Name" onChange={handleChange} margin="normal" required />
          <TextField fullWidth name="email" label="Email" onChange={handleChange} margin="normal" required />
          <TextField fullWidth name="password" label="Password" type="password" onChange={handleChange} margin="normal" required />
          <TextField fullWidth name="address" label="Address" onChange={handleChange} margin="normal" required />
          <TextField fullWidth name="unitNumber" label="Unit Number" onChange={handleChange} margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Property Type</InputLabel>
            <Select name="propertyType" value={form.propertyType} onChange={handleChange}>
              <MenuItem value="condo">Condo</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="townhouse">Townhouse</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>Register</Button>
        </form>
      </Box>
    </Container>
  );
}
