import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  Divider
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: 70 }}>
          {/* Left - Title */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="white"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "1.2px",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              PRATHMESH BARBER COMMUNITY
            </Typography>
          </motion.div>

          {/* Right - Buttons */}
          <Box>
            <Button onClick={() => setAboutOpen(true)} sx={{ color: "white" }}>
              About
            </Button>
            <Button onClick={() => setContactOpen(true)} sx={{ color: "white" }}>
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* About Drawer */}
      <Drawer
        anchor="right"
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "rgba(30, 30, 30, 0.85)",
            color: "#fff",
            px: 3,
            py: 2,
            fontFamily: "Montserrat",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            About
          </Typography>
          <IconButton onClick={() => setAboutOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Typography variant="body2" lineHeight={1.6}>
          Welcome to <strong>Prathmesh Barber Community</strong>!<br /><br />
          This platform connects barbers and customers, allowing users to discover, book, and review
          salons nearby. Our mission is to streamline barber service management for both shop owners
          and clients.
        </Typography>
      </Drawer>

      {/* Contact Drawer */}
      <Drawer
        anchor="right"
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "rgba(30, 30, 30, 0.85)",
            color: "#fff",
            px: 3,
            py: 2,
            fontFamily: "Montserrat",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            Contact
          </Typography>
          <IconButton onClick={() => setContactOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="body2">Liasprathmesh@gmail.com</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="body2">8080617966</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
