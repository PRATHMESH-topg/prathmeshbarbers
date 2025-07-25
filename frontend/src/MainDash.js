import React from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainDash = () => {
  const navigate = useNavigate();

  const cardStyle = {
    bgcolor: 'rgba(29, 28, 28, 0.7)',
    p: 4,
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.3s ease',
    '&:hover': { transform: 'scale(1.03)' },
    width: { xs: '100%', sm: '80%', md: 360 }, // responsive width
    mx: 'auto',
    mb: { xs: 3, md: 0 },
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
        px: 2,
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: 'white', fontWeight: 'bold', mb: 5 }}
          >
            Welcome to Barber Booking Portal
          </Typography>

          {/* Horizontal Flex Container */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="stretch"
            gap={4} // spacing between cards
            flexWrap="wrap"
          >
            {/* Shop Registration */}
            <Paper sx={cardStyle} elevation={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Shop Registration
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Register your salon or barbershop to start getting appointments from customers.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate('/shop-registration')}
              >
                Register Shop
              </Button>
            </Paper>

            {/* Customer Registration */}
            <Paper sx={cardStyle} elevation={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Customer Sign-up
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Sign up to explore nearby barbers and book your appointments seamlessly.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={() => navigate('/customer-registration')}
              >
                Sign Up as Customer
              </Button>
            </Paper>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MainDash;

