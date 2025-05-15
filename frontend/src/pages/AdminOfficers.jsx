import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../services/api';

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
  },
  position: 'relative'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  fontSize: '2rem'
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1)
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

export default function AdminOfficers() {
  const [officers, setOfficers] = useState(defaultOfficers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    section: '' // 'president', 'executives', or 'boardMembers'
  });

  const handleOpenDialog = (officer = null, section = '') => {
    if (officer) {
      setEditingOfficer(officer);
      setFormData({
        name: officer.name,
        email: officer.email,
        role: officer.role,
        section
      });
    } else {
      setEditingOfficer(null);
      setFormData({
        name: '',
        email: '',
        role: '',
        section: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingOfficer(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      section: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const newOfficer = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      initials: formData.name.split(' ').map(n => n[0]).join('')
    };

    if (editingOfficer) {
      // Update existing officer
      setOfficers(prev => {
        const updated = { ...prev };
        if (formData.section === 'president') {
          updated.president = newOfficer;
        } else {
          const index = prev[formData.section].findIndex(o => o.email === editingOfficer.email);
          if (index !== -1) {
            updated[formData.section] = [
              ...prev[formData.section].slice(0, index),
              newOfficer,
              ...prev[formData.section].slice(index + 1)
            ];
          }
        }
        return updated;
      });
    } else {
      // Add new officer
      setOfficers(prev => {
        const updated = { ...prev };
        if (formData.section === 'president') {
          updated.president = newOfficer;
        } else {
          updated[formData.section] = [...prev[formData.section], newOfficer];
        }
        return updated;
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (officer, section) => {
    if (window.confirm('Are you sure you want to remove this officer?')) {
      setOfficers(prev => {
        const updated = { ...prev };
        if (section === 'president') {
          updated.president = null;
        } else {
          updated[section] = prev[section].filter(o => o.email !== officer.email);
        }
        return updated;
      });
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Manage Officers
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Officer
        </Button>
      </Box>

      {/* President - Top Position */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
          <OfficerCard elevation={3}>
            <ActionButtons>
              <Tooltip title="Edit">
                <IconButton onClick={() => handleOpenDialog(officers.president, 'president')} size="small">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(officers.president, 'president')} size="small">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ActionButtons>
            <StyledAvatar sx={{ width: 120, height: 120, fontSize: '2.5rem' }}>
              {officers.president?.initials}
            </StyledAvatar>
            <Typography variant="h5" component="h2">
              {officers.president?.name}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {officers.president?.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {officers.president?.email}
            </Typography>
          </OfficerCard>
        </Box>
      </Box>

      {/* Executive Officers */}
      <Grid container spacing={4} sx={{ mb: 6, justifyContent: 'center' }}>
        {officers.executives.map((officer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <OfficerCard elevation={2}>
              <ActionButtons>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleOpenDialog(officer, 'executives')} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(officer, 'executives')} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ActionButtons>
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
        {officers.boardMembers.map((officer, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <OfficerCard elevation={2}>
              <ActionButtons>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleOpenDialog(officer, 'boardMembers')} size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(officer, 'boardMembers')} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ActionButtons>
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

      {/* Add/Edit Officer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingOfficer ? 'Edit Officer' : 'Add New Officer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Position Type</InputLabel>
              <Select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                label="Position Type"
              >
                <MenuItem value="president">President</MenuItem>
                <MenuItem value="executives">Executive</MenuItem>
                <MenuItem value="boardMembers">Board Member</MenuItem>
              </Select>
            </FormControl>
            {formData.section === 'executives' && (
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="Vice President">Vice President</MenuItem>
                  <MenuItem value="Secretary">Secretary</MenuItem>
                  <MenuItem value="Treasurer">Treasurer</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name || !formData.email || !formData.section}
          >
            {editingOfficer ? 'Save Changes' : 'Add Officer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 