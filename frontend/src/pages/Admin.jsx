import { Typography, Button, Box, Grid, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdminPage() {
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
          Admin Panel
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Manage Users Card */}
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
                Manage Users
              </Typography>
              <Typography sx={{ mb: 3 }}>
                View, update, or remove homeowners and admins.
              </Typography>
              <Button
                component={Link}
                to="/admin/users"
                variant="contained"
                sx={{ mt: 'auto', alignSelf: 'flex-start' }}
              >
                Go to Users
              </Button>
            </Paper>
          </Grid>

          {/* Manage Announcements Card */}
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
                Manage Announcements
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Create and edit community updates.
              </Typography>
              <Button
                component={Link}
                to="/admin/announcements"
                variant="contained"
                sx={{ mt: 'auto', alignSelf: 'flex-start' }}
              >
                Go to Announcements
              </Button>
            </Paper>
          </Grid>

          {/* Manage Payments Card */}
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
                Manage Payments
              </Typography>
              <Typography sx={{ mb: 3 }}>
                View and track payment history.
              </Typography>
              <Button
                component={Link}
                to="/admin/payments"
                variant="contained"
                sx={{ mt: 'auto', alignSelf: 'flex-start' }}
              >
                Go to Payments
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
