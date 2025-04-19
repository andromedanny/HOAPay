import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put('/auth/profile', user);
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        value={user.firstName}
        onChange={(e) => setUser({...user, firstName: e.target.value})}
        disabled={!isEditing}
      />
      {/* Include other fields similarly */}
      
      {isEditing ? (
        <>
          <Button variant="contained" onClick={handleUpdate} sx={{ mt: 2 }}>
            Save Changes
          </Button>
          <Button onClick={() => setIsEditing(false)} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="outlined" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      )}
    </Container>
  );
}