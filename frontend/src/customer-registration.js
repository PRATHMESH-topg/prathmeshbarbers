import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.text();

      if (!response.ok) {
        alert(`Error: ${result}`);
      } else {
        alert(result);
        setFormData({ name: '', email: '', password: '' });
        navigate('/user', { state: { customerName: formData.name } });
      }
    } catch (error) {
      alert('Something went wrong during registration');
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/all');
      const users = await response.json();

      const found = users.find(
        (u) => u.name === loginData.name && u.password === loginData.password
      );

      if (found) {
        alert('Login successful');
        navigate('/user', { state: { customerName: found.name } });
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://t4.ftcdn.net/jpg/01/94/83/35/240_F_194833567_g3SapyrnYDmoasuEyHuKI0gS3NVcUvj1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(6px)',
        pt:8
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            bgcolor: 'rgba(32, 31, 31, 0.75)',
            p: 4,
            borderRadius: 4,
            color: 'white',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 20px rgba(255,255,255,0.1)',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Customer Registration
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            variant="filled"
            value={formData.name}
            onChange={handleChange}
            InputProps={{ sx: { color: 'white' } }}
            InputLabelProps={{ sx: { color: 'white' } }}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ sx: { color: 'white' } }}
            InputLabelProps={{ sx: { color: 'white' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            InputProps={{ sx: { color: 'white' } }}
            InputLabelProps={{ sx: { color: 'white' } }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Register
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Login Dialog */}
      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>Customer Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="dense"
            value={loginData.name}
            onChange={handleLoginChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="dense"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
          <Button onClick={() => setShowLogin(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerRegistration;





