import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        width: "100%",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: "rgba(10, 8, 8, 0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "#fff",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "16px",
        letterSpacing: "1px",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} PRATHMESH BARBER COMMUNITY. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

