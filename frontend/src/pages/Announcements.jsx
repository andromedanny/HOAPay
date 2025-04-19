import { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import AddAnnouncement from '../components/announcements/AddAnnouncement';
import api from '../services/api';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Community Announcements</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'New Announcement'}
        </Button>
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
              <Typography variant="h6" gutterBottom>
                {announcement.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}