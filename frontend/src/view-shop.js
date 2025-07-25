import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Box,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Background = styled('div')({
  minHeight: '100vh',
  backgroundImage: 'url(https://t4.ftcdn.net/jpg/01/94/83/35/240_F_194833567_g3SapyrnYDmoasuEyHuKI0gS3NVcUvj1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backdropFilter: 'blur(8px)',
  paddingTop: '120px',
  paddingBottom: '80px',
});

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(30, 30, 30, 0.8)',
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  
}));

function ViewShops() {
  const [shops, setShops] = useState([]);
  const [editingShopId, setEditingShopId] = useState(null);
  const [updatedShop, setUpdatedShop] = useState({ shopName: '', description: '', services: '' });
  const [orders, setOrders] = useState([]);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [selectedShopName, setSelectedShopName] = useState('');

  const fetchShops = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/shops');
      setShops(response.data);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleEditClick = (shop) => {
    setEditingShopId(shop.id);
    setUpdatedShop({
      shopName: shop.shopName,
      description: shop.description || '',
      services: shop.services.join(', ')
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedShop(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (id) => {
    try {
      const updatedData = {
        shopName: updatedShop.shopName,
        description: updatedShop.description,
        services: updatedShop.services.split(',').map(s => s.trim())
      };
      await axios.put(`http://localhost:9090/api/shops/${id}`, updatedData);
      alert('✅ Shop updated!');
      setEditingShopId(null);
      fetchShops();
    } catch (error) {
      alert('❌ Update failed');
      console.error(error);
    }
  };

  const handleViewOrders = async (shopId, shopName) => {
    try {
      const res = await axios.get(`http://localhost:9090/api/deals/all`);
      const filtered = res.data.filter(order => order.shopId === shopId);
      setOrders(filtered);
      setSelectedShopName(shopName);
      setShowOrderPopup(true);
    } catch (err) {
      console.error(err);
      alert('Could not load orders.');
    }
  };

  return (
    <Background>
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="white">Registered Shops</Typography>
        <Grid container spacing={4}>
          {shops.map((shop) => (
            <Grid item xs={12} md={6} lg={4} key={shop.id}>
              <StyledCard>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(shop.shopName)}&background=random&color=fff&size=100`} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Typography variant="h6">{shop.shopName}</Typography>
                  </Box>

                  {editingShopId === shop.id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Shop Name"
                        name="shopName"
                        value={updatedShop.shopName}
                        onChange={handleUpdateChange}
                        margin="dense"
                        InputProps={{ sx: { color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                      />
                      <TextField
                        fullWidth
                        multiline
                        label="Description"
                        name="description"
                        value={updatedShop.description}
                        onChange={handleUpdateChange}
                        margin="dense"
                        InputProps={{ sx: { color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                      />
                      <TextField
                        fullWidth
                        label="Services (comma-separated)"
                        name="services"
                        value={updatedShop.services}
                        onChange={handleUpdateChange}
                        margin="dense"
                        InputProps={{ sx: { color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                      />
                      <Box mt={2}>
                        <Button variant="contained" color="success" onClick={() => handleUpdateSubmit(shop.id)} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={() => setEditingShopId(null)}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" gutterBottom>Description: {shop.description || 'N/A'}</Typography>
                      <Typography variant="body1" gutterBottom>
                        Services: {shop.services.map((s, i) => (
                          <Chip key={i} label={s} size="small" sx={{ mr: 1, mt: 1 }} color="primary" />
                        ))}
                      </Typography>
                      <Box mt={2}>
                        <Button variant="contained" color="warning" onClick={() => handleEditClick(shop)} sx={{ mr: 1 }}>Edit</Button>
                        <Button variant="contained" onClick={() => handleViewOrders(shop.id, shop.shopName)}>View Orders</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Dialog open={showOrderPopup} onClose={() => setShowOrderPopup(false)} fullWidth maxWidth="sm">
          <DialogTitle>Orders for {selectedShopName}</DialogTitle>
          <DialogContent dividers>
            {orders.length === 0 ? (
              <Typography>No orders yet.</Typography>
            ) : (
              orders.map((order, idx) => (
                <Box key={idx} mb={2} p={2} bgcolor="#ddd2d2ff" borderRadius={2}>
                  <Typography variant="subtitle1">Customer you Get: {order.customerName}</Typography>
                  <Typography variant="body2">Time: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</Typography>
                </Box>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowOrderPopup(false)} variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Background>
  );
}

export default ViewShops;


