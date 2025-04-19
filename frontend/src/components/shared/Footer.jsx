import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} HOA Management System
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
        Community Portal Version 1.0
      </Typography>
    </Box>
  );
}