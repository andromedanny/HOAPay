import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import api from '../../services/api';

export default function AddAnnouncement({ onSuccess }) {
  const [open, setOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/announcements', formData);
      onSuccess();
      handleClose();
    } catch (err) {
      console.error('Failed to create announcement:', err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Announcement</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            required
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Publish</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}