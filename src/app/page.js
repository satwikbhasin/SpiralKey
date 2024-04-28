"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  TextareaAutosize,
  Box,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import "./globals.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [plaintext, setPlaintext] = useState("");

  const EncryptionState = {
    IDLE: "idle",
    IN_PROGRESS: "in-progress",
    DONE: "done",
  };

  const [symmetricEncryption, setSymmetricEncryption] = useState(
    EncryptionState.IDLE
  );
  const [spiralEncrypting, setSpiralEncrypting] = useState(
    EncryptionState.IDLE
  );
  function handleEncrypt() {
    if (plaintext.trim() === "") {
      return;
    }
    setSymmetricEncryption(EncryptionState.IN_PROGRESS);
    setSpiralEncrypting(EncryptionState.IN_PROGRESS);
    setTimeout(() => {
      setSymmetricEncryption(EncryptionState.DONE);
      setSpiralEncrypting(EncryptionState.DONE);
    }, 5000);
    console.log("Encrypting", plaintext);
  }

  useEffect(() => {
    console.log("Symmetric Encryption Status", symmetricEncryption);
    console.log("Spiral Encryption Status", spiralEncrypting);
  }, [symmetricEncryption, spiralEncrypting]);

  return (
    <div
      style={{ backgroundColor: "#1f1f1f", height: "100vh", width: "100vw" }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "center",
            backgroundColor: "#181818",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Jersey 15', sans-serif",
              fontWeight: "400",
              letterSpacing: "0.1em",
            }}
            className="gradient"
          >
            SpiralKey
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mt: 10,
            fontFamily: "'Jersey 15', sans-serif",
            fontWeight: "400",
            letterSpacing: "0.1em",
          }}
        >
          Welcome to SpiralKey
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mt: 2,
            fontFamily: "'Jersey 15', sans-serif",
            fontWeight: "400",
            letterSpacing: "0.1em",
          }}
          className="gradient"
        >
          <span>Symmetric Key</span>
          <span> + </span>
          <span>Spiral Matrix </span>
          Encryption
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            overflow: "auto",
            mt: 5,
            ml: 5,
            mr: 5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 1,
              fontFamily: "'Jersey 15', sans-serif",
              fontWeight: "400",
              letterSpacing: "0.1em",
            }}
          >
            Plain Text
          </Typography>
          <TextareaAutosize
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            disabled={symmetricEncryption === EncryptionState.IN_PROGRESS}
            onKeyDown={(e) => {
              if (e.key === "Enter" && plaintext.trim() !== "") {
                handleEncrypt();
                e.preventDefault();
              }
            }}
            style={{
              width: "100%",
              overflow: "auto",
              color: "#6c6c74",
              backgroundColor: "#1f1f1f",
              border: "1px solid #6c6c74",
              padding: 10,
            }}
          />
          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={() => {
              handleEncrypt();
            }}
            disabled={
              !plaintext.trim() ||
              symmetricEncryption === EncryptionState.IN_PROGRESS
            }
            sx={{
              background: "#8d5380",
              mt: 1,
              "&:hover": {
                background: !plaintext.trim() ? "#888" : "#adbcfc",
              },
            }}
          >
            <Typography
              variant="body"
              sx={{
                fontFamily: "'Jersey 15', sans-serif",
                fontWeight: "400",
                letterSpacing: "0.1em",
              }}
            >
              Encrypt
            </Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
}
