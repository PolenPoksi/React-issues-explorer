// pages/index.js
import { Button, Container, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/react.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ zIndex: 2, position: "relative", textAlign: "center" }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          color="common.white"
        >
          Welcome to the React Issues Explorer
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          color="common.white"
        >
          Explore issues from the React.js GitHub repository.
        </Typography>
        <Link href="/issues" passHref>
          <Button variant="contained" color="primary" size="large">
            View Issues
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
