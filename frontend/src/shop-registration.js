import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  List,
  ListItem
} from '@mui/material';
import { motion } from 'framer-motion';

const ShopRegistration = () => {
  const [shop, setShop] = useState({ name: '', services: [], description: '' });
  const [serviceInput, setServiceInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const navigate = useNavigate();

  const handleAddDescription = () => {
    if (descInput.trim()) {
      setShop({ ...shop, description: descInput });
      setDescInput('');
      alert('Description added!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, services, description } = shop;

    if (!name.trim() || services.length === 0 || !description.trim()) {
      alert('Please enter shop name, description, and at least one service!');
      return;
    }

    const payload = {
      shopName: name,
      services: services,
      description: description
    };

    try {
      await axios.post('http://localhost:9090/api/shops', payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert('Shop registered successfully!');
      setShop({ name: '', services: [], description: '' });
      setServiceInput('');
      setDescInput('');
    } catch (error) {
      console.error('Failed to register shop:', error);
      alert('Error registering shop. Check backend API.');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'rgba(29, 28, 28, 0.7)',
        minHeight: '100vh',
        backgroundImage: 'url("https://t4.ftcdn.net/jpg/01/94/83/35/240_F_194833567_g3SapyrnYDmoasuEyHuKI0gS3NVcUvj1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            elevation={5}
            sx={{
              borderRadius: 3,
              backgroundColor: 'rgba(56, 53, 53, 0.7)',
              color: 'white',
              backdropFilter: 'blur(8px)',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                Register Your Shop
              </Typography>

              <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Shop Name"
                  variant="filled"
                  value={shop.name}
                  onChange={(e) => setShop({ ...shop, name: e.target.value })}
                  sx={{ mb: 3 }}
                  required
                  InputLabelProps={{ style: { color: '#ccc' } }}
                  InputProps={{
                    style: { color: '#fff', backgroundColor: '#1e1e1e' }
                  }}
                />

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Service"
                    variant="filled"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{
                      style: { color: '#fff', backgroundColor: '#1e1e1e' }
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (serviceInput.trim()) {
                        setShop({ ...shop, services: [...shop.services, serviceInput] });
                        setServiceInput('');
                      }
                    }}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    Add
                  </Button>
                </Stack>

                {shop.services.length > 0 && (
                  <List dense>
                    {shop.services.map((s, i) => (
                      <ListItem key={i} sx={{ pl: 0, color: '#ccc' }}>
                        • {s}
                      </ListItem>
                    ))}
                  </List>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    label="Shop Description"
                    variant="filled"
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{
                      style: { color: '#fff', backgroundColor: '#1e1e1e' }
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddDescription}
                  >
                    Add Description
                  </Button>
                </Stack>

                {shop.description && (
                  <Typography variant="body1" sx={{ mt: 2, color: '#ccc' }}>
                    <strong>Description:</strong> {shop.description}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 4 }}
                >
                  Register Shop
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="white"
                  onClick={() => navigate('/view-shop')}
                  sx={{ mt: 2 }}
                >
                  View Shops
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ShopRegistration;

















