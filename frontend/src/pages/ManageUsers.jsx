import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Tooltip,
  Switch,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { Delete, Edit, Save, Cancel, Add } from '@mui/icons-material';
import api from '../services/api.js';

const roleLabels = {
  admin: 'Admin',
  pres: 'President',
  vp: 'Vice President',
  sec: 'Secretary',
  treasurer: 'Treasurer',
  bod: 'Board of Directors',
  resident: 'Resident',
  homeowner: 'Homeowner',
};

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    unitNumber: '',
    propertyType: 'condo',
    role: 'homeowner',
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleSaveEdit = async () => {
    try {
      await api.put(`/admin/users/${editingUserId}`, editedUser);
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleVerified = async (user) => {
    try {
      await api.put(`/admin/users/${user.id}`, {
        ...user,
        isVerified: !user.isVerified,
      });
      fetchUsers();
    } catch (err) {
      console.error('Toggle verified error:', err);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      unitNumber: '',
      propertyType: 'condo',
      role: 'homeowner',
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', newUser);
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>
          Add New User
        </Button>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
          <TextField name="firstName" label="First Name" value={newUser.firstName} onChange={handleNewUserChange} fullWidth required />
          <TextField name="lastName" label="Last Name" value={newUser.lastName} onChange={handleNewUserChange} fullWidth required />
          <TextField name="email" label="Email" value={newUser.email} onChange={handleNewUserChange} fullWidth required />
          <TextField name="password" label="Password" type="password" value={newUser.password} onChange={handleNewUserChange} fullWidth required />
          <TextField name="address" label="Address" value={newUser.address} onChange={handleNewUserChange} fullWidth required />
          <TextField name="unitNumber" label="Unit Number" value={newUser.unitNumber} onChange={handleNewUserChange} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Property Type</InputLabel>
            <Select name="propertyType" value={newUser.propertyType} onChange={handleNewUserChange} label="Property Type">
              <MenuItem value="condo">Condo</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="townhouse">Townhouse</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={newUser.role} onChange={handleNewUserChange} label="Role">
              {Object.entries(roleLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateUser}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField name="firstName" value={editedUser.firstName} onChange={handleChange} />
                  ) : (
                    `${user.firstName} ${user.lastName}`
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <TextField name="email" value={editedUser.email} onChange={handleChange} />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user.id ? (
                    <FormControl fullWidth>
                      <Select name="role" value={editedUser.role} onChange={handleChange}>
                        {Object.entries(roleLabels).map(([value, label]) => (
                          <MenuItem key={value} value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    roleLabels[user.role] || user.role
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isVerified}
                    onChange={() => handleToggleVerified(user)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="right">
                  {editingUserId === user.id ? (
                    <>
                      <IconButton onClick={handleSaveEdit}><Save /></IconButton>
                      <IconButton onClick={handleCancelEdit}><Cancel /></IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(user)}><Edit /></IconButton>
                      <IconButton onClick={() => handleDelete(user.id)}><Delete /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
