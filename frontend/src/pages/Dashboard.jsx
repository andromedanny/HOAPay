import { Typography, Button, Box, Grid, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // ✅ Get role from localStorage

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}
        >
          {isLoggedIn ? 'Your Community Dashboard' : 'Welcome to HOA Management'}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {isLoggedIn ? (
            <>
              {/* Payment Portal Card */}
              <Grid item>
                <Paper
                  elevation={3}
                  sx={{
                    width: 500,
                    minHeight: 200,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Payment Portal
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    {role === 'admin' 
                      ? 'Manage and review all community payments.'
                      : 'Make payments, and check payment history.'}
                  </Typography>
                  <Button
                    component={Link}
                    to={role === 'admin' ? '/admin/payments' : '/payments'}
                    variant="contained"
                    sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                  >
                    {role === 'admin' ? 'Manage Payments' : 'Go to Payments'}
                  </Button>
                </Paper>
              </Grid>

              {/* Community Announcements Card */}
              <Grid item>
                <Paper
                  elevation={3}
                  sx={{
                    width: 500,
                    minHeight: 200,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Community Announcements
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    View the latest updates from your HOA board.
                  </Typography>
                  <Button
                    component={Link}
                    to="/announcements"
                    variant="contained"
                    sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                  >
                    View Announcements
                  </Button>
                </Paper>
              </Grid>

              {/* HOA Officers Card */}
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 500,
                    minHeight: 200,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Meet Your HOA Officers
                  </Typography>
                  <Typography>
                    A list of HOA officers and their contact info will appear here.
                  </Typography>
                  <Button
                    component={Link}
                    to="/officers"
                    variant="contained"
                    sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                  >
                    View Officers
                  </Button>
                </Paper>
              </Grid>

              {/* Manage Users Card (Admin Only) */}
              {role === 'admin' && (
                <Grid item xs={12}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      width: 500,
                      minHeight: 200,
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      Manage Users
                    </Typography>
                    <Typography>
                      Add, edit, or remove community members and manage their access.
                    </Typography>
                    <Button
                      component={Link}
                      to="/admin/users"
                      variant="contained"
                      sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                    >
                      Manage Users
                    </Button>
                  </Paper>
                </Grid>
              )}
            </>
          ) : (
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Access Your Community Portal
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Login or register to view payments, announcements, and community features.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button component={Link} to="/login" variant="contained" size="large">
                    Login
                  </Button>
                  <Button component={Link} to="/register" variant="outlined" size="large">
                    Register
                  </Button>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
