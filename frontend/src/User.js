import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import HandshakeIcon from '@mui/icons-material/Handshake';

// Styled Background Container
const Background = styled(Box)(() => ({
  minHeight: '100vh',
  backgroundImage: 'url(https://t4.ftcdn.net/jpg/01/94/83/35/240_F_194833567_g3SapyrnYDmoasuEyHuKI0gS3NVcUvj1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backdropFilter: 'blur(5px)',
  padding: '120px 20px 40px', // ⬅️ Added top padding to avoid header overlap
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const User = () => {
  const location = useLocation();
  const [shops, setShops] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const user = location.state?.customerName || 'Guest';
  const theme = useTheme();

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/shops')
      .then((res) => setShops(res.data))
      .catch((err) => console.error('Failed to load shops:', err));
  }, []);

  const confirmDeal = async (shopId, shopName) => {
    try {
      const payload = { customerName: user, shopId, shopName };
      const response = await axios.post('http://localhost:9090/api/deals/confirm', payload);

      if (response.status === 200 || response.status === 201) {
        setPopupMessage(`✅ Deal confirmed with ${shopName}`);
        setPopupVisible(true);
      }
    } catch (error) {
      console.error('Error confirming deal:', error);
      setPopupMessage('❌ An error occurred while confirming the deal.');
      setPopupVisible(true);
    }
  };

  return (
    <Background>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 4px #000' }}
      >
        Welcome, {user}
      </Typography>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ color: 'white', mb: 4, textShadow: '1px 1px 2px #000' }}
      >
        Explore Available Barber Shops
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {shops.map((shop) => (
          <Card
            key={shop.id}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.08)', // ⬅️ Glass-like transparency
              backdropFilter: 'blur(6px)',
              borderRadius: 3,
              color: 'white',
              boxShadow: 6,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 10,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(shop.shopName)}&background=random&color=fff`}
                  alt={shop.shopName}
                  sx={{ width: 60, height: 60 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {shop.shopName}
                </Typography>
              </Box>

              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {shop.description || 'No description provided.'}
              </Typography>

              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {shop.services.map((service, index) => (
                  <Chip
                    key={index}
                    label={service}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
              <Button
                variant="contained"
                startIcon={<HandshakeIcon />}
                color="success"
                onClick={() => confirmDeal(shop.id, shop.shopName)}
              >
                Confirm Deal
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Deal Confirmation Dialog */}
      <Dialog open={popupVisible} onClose={() => setPopupVisible(false)}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <Typography>{popupMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopupVisible(false)} autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Background>
  );
};

export default User;


