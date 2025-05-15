import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AddAnnouncement from '../components/announcements/AddAnnouncement';
import api from '../services/api';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = localStorage.getItem('role') === 'admin';

  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching announcements...');
      const res = await api.get('/announcements');
      console.log('Announcements response:', res.data);
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
      setError('Failed to load announcements. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement) => {
    console.log('Editing announcement:', announcement);
    setEditingAnnouncement(announcement);
    setEditForm({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority || 'normal'
    });
    setShowEditDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        console.log('Deleting announcement:', id);
        await api.delete(`/announcements/${id}`);
        fetchAnnouncements();
      } catch (err) {
        console.error('Failed to delete announcement:', err);
        setError('Failed to delete announcement. Please try again.');
      }
    }
  };

  const handleEditSubmit = async () => {
    try {
      console.log('Updating announcement:', editingAnnouncement.id, editForm);
      await api.put(`/announcements/${editingAnnouncement.id}`, editForm);
      setShowEditDialog(false);
      fetchAnnouncements();
    } catch (err) {
      console.error('Failed to update announcement:', err);
      setError('Failed to update announcement. Please try again.');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'normal':
        return 'primary';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Community Announcements</Typography>
        {isAdmin && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'New Announcement'}
          </Button>
        )}
      </Box>

      {showForm && <AddAnnouncement onSuccess={() => {
        setShowForm(false);
        fetchAnnouncements();
      }} />}

      {announcements.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>No announcements yet.</Typography>
      ) : (
        announcements.map((announcement) => (
          <Card key={announcement.id} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {announcement.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Posted on: {new Date(announcement.created_at).toLocaleDateString()}
                    </Typography>
                    {announcement.priority && (
                      <Chip 
                        label={announcement.priority.toUpperCase()} 
                        color={getPriorityColor(announcement.priority)}
                        size="small"
                      />
                    )}
                  </Box>
                </Box>
                {isAdmin && (
                  <Box>
                    <IconButton onClick={() => handleEdit(announcement)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(announcement.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Typography variant="body1">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Announcement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={editForm.content}
            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={editForm.priority}
              label="Priority"
              onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}