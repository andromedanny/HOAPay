import { Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminOfficers from './AdminOfficers';

const OfficerCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  width: '100%',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  fontSize: '2rem'
}));

const defaultOfficers = {
  president: { name: 'Juan Dela Cruz', role: 'President', email: 'president@hoa.com', initials: 'JD' },
  executives: [
    { name: 'Maria Santos', role: 'Vice President', email: 'vp@hoa.com', initials: 'MS' },
    { name: 'Ana Gonzales', role: 'Secretary', email: 'secretary@hoa.com', initials: 'AG' },
    { name: 'Pedro Reyes', role: 'Treasurer', email: 'treasurer@hoa.com', initials: 'PR' }
  ],
  boardMembers: [
    { name: 'Ricardo Luna', role: 'Board Member', email: 'ricardo@hoa.com', initials: 'RL' },
    { name: 'Elena Torres', role: 'Board Member', email: 'elena@hoa.com', initials: 'ET' },
    { name: 'Manuel Garcia', role: 'Board Member', email: 'manuel@hoa.com', initials: 'MG' },
    { name: 'Isabel Cruz', role: 'Board Member', email: 'isabel@hoa.com', initials: 'IC' },
    { name: 'Roberto Lim', role: 'Board Member', email: 'roberto@hoa.com', initials: 'RL' },
    { name: 'Carmen Tan', role: 'Board Member', email: 'carmen@hoa.com', initials: 'CT' },
    { name: 'David Wong', role: 'Board Member', email: 'david@hoa.com', initials: 'DW' },
    { name: 'Sofia Reyes', role: 'Board Member', email: 'sofia@hoa.com', initials: 'SR' }
  ]
};

export default function Officers() {
  const isAdmin = localStorage.getItem('role') === 'admin';

  if (isAdmin) {
    return <AdminOfficers />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      {/* President - Top Position */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
          <OfficerCard elevation={3}>
            <StyledAvatar sx={{ width: 120, height: 120, fontSize: '2.5rem' }}>
              {defaultOfficers.president.initials}
            </StyledAvatar>
            <Typography variant="h5" component="h2">
              {defaultOfficers.president.name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {defaultOfficers.president.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {defaultOfficers.president.email}
            </Typography>
          </OfficerCard>
        </Box>
      </Box>

      {/* Executive Officers */}
      <Grid container spacing={4} sx={{ mb: 6, justifyContent: 'center' }}>
        {defaultOfficers.executives.map((officer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <OfficerCard elevation={2}>
              <StyledAvatar>{officer.initials}</StyledAvatar>
              <Typography variant="h6" component="h2">
                {officer.name}
              </Typography>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                {officer.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {officer.email}
              </Typography>
            </OfficerCard>
          </Grid>
        ))}
      </Grid>

      {/* Board Members - Two rows of 4 */}
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 4 }}>
        Board of Directors
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {defaultOfficers.boardMembers.map((officer, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <OfficerCard elevation={2}>
              <StyledAvatar>{officer.initials}</StyledAvatar>
              <Typography variant="h6" component="h2">
                {officer.name}
              </Typography>
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                Board of Directors
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {officer.email}
              </Typography>
            </OfficerCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
  