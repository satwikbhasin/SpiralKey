"use client";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import "./globals.css";
import { useState } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      mt: 20,
    }}
  >
    <CircularProgress sx={{ color: "#fa9c2f" }} />
  </Box>
);
const Encryption = dynamic(() => import("@/components/encryption"), {
  loading: () => <Loader />,
});

const Decryption = dynamic(() => import("@/components/decryption"), {
  loading: () => <Loader />,
});

export default function Home() {
  const AppMode = {
    ENCRYPTION: "encryption",
    DECRYPTION: "decryption",
  };
  const [mode, setMode] = useState(AppMode.ENCRYPTION);
  return (
    <div
      style={{
        backgroundColor: "#1f1f1f",
        minHeight: "100vh",
        width: "100%",
        padding: 50,
      }}
    >
      <AppBar position="absolute" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "center",
            backgroundColor: "#181818",
          }}
        >
          <Typography variant="h3" className="gradient jersey-15">
            SpiralKey
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Typography
          variant="h3"
          className="jersey-15"
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >
          Welcome to SpiralKey
        </Typography>
        <Typography
          variant="h5"
          className="gradient jersey-15"
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          <span>Symmetric Key</span>
          <span> + </span>
          <span>Spiral Matrix </span>
          Encryption
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Button
          onClick={() => setMode(AppMode.ENCRYPTION)}
          sx={{
            mr: 2,
            backgroundColor: "",
            color: mode === AppMode.ENCRYPTION ? "#fa9c2f" : "#6c6c74",
            textTransform: "lowercase",
            fontSize: "1.4rem",
          }}
          className="jersey-15"
        >
          Encryption
        </Button>
        <Button
          sx={{
            mr: 2,
            backgroundColor: "",
            color: mode === AppMode.DECRYPTION ? "#fa9c2f" : "#6c6c74",
            textTransform: "lowercase",
            fontSize: "1.4rem",
          }}
          onClick={() => setMode(AppMode.DECRYPTION)}
          className="jersey-15"
        >
          Decryption
        </Button>
      </Box>
      {mode === AppMode.ENCRYPTION ? <Encryption /> : <Decryption />}
    </div>
  );
}
