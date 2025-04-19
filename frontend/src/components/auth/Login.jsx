import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Alert
} from '@mui/material';
import api from '../../services/api.js';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Store the authentication token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role); 
      // Redirect to dashboard and refresh to update UI
      navigate('/');
      window.location.reload(); // This ensures Navbar updates
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ color: 'primary.main' }}
        >
          HOA Member Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            autoComplete="username"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            autoComplete="current-password"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem'
            }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button> 

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link 
              href="/register" 
              underline="hover"
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                cursor: 'pointer'
              }}
            >
              Register here
            </Link>
          </Typography>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link 
              href="/forgot-password" 
              underline="hover"
              sx={{
                color: 'text.secondary'
              }}
            >
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}