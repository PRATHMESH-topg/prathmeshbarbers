import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Grid,
  Alert,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewOrders = () => {
  const { shopName } = useParams();
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/deals/shop/${shopName}`);
        setDeals(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("Error fetching deals.");
      }
    };

    fetchDeals();
  }, [shopName]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-mosaic.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: "rgba(0,0,0,0.75)", borderRadius: 4, p: 4 }}>
        <Typography variant="h4" color="white" gutterBottom align="center">
          Orders for {shopName}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {deals.length === 0 ? (
          <Typography color="white" align="center">No orders confirmed yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {deals.map((deal, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: "#121212", color: "#fff" }}>
                  <CardHeader
                    avatar={<Avatar>{deal.customerName?.charAt(0)}</Avatar>}
                    title={`Customer: ${deal.customerName}`}
                    titleTypographyProps={{ fontSize: 18 }}
                  />
                  <CardContent>
                    <Typography variant="body2">This customer has confirmed the deal with your shop.</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/shop-registration")}
            startIcon={<ArrowBackIcon />}
            sx={{ borderRadius: 3 }}
          >
            Back to Shops
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ViewOrders;
