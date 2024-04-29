"use client";
import { Typography, TextareaAutosize, Box, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "../app/globals.css";
import { useState, useEffect, useRef } from "react";

export default function Decryption() {
  const [ciphertext, setCiphertext] = useState("");
  const [spiralPlaintext, setSpiralPlaintext] = useState("");
  const [symmetricPlaintext, setSymmetricPlaintext] = useState("");
  const [finalCipher, setFinalCipher] = useState("");
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");

  const [plaintextCopied, setPlaintextCopied] = useState(false);

  const DecryptionState = {
    IDLE: "idle",
    IN_PROGRESS: "in-progress",
    DONE: "done",
  };

  const [spiralDecryptionStatus, setSpiralDecryptionStatus] = useState(
    DecryptionState.IDLE
  );
  const [symmetricDecryptionStatus, setSymmetricDecryptionStatus] = useState(
    DecryptionState.IDLE
  );

  const spiralCipherRef = useRef(null);
  const symmetricCipherRef = useRef(null);

  useEffect(() => {
    if (spiralPlaintext && spiralDecryptionStatus === DecryptionState.DONE) {
      spiralCipherRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (
      symmetricPlaintext &&
      symmetricDecryptionStatus === DecryptionState.DONE
    ) {
      symmetricCipherRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    symmetricPlaintext,
    spiralPlaintext,
    symmetricDecryptionStatus,
    spiralDecryptionStatus,
  ]);

  function handleDecrypt() {
    if (ciphertext.trim() === "") {
      return;
    }
    setSpiralDecryptionStatus(DecryptionState.IN_PROGRESS);
    setTimeout(() => {
      setSpiralDecryptionStatus(DecryptionState.DONE);
      setSpiralPlaintext("DUMMY_SPIRAL_PLAINTEXT");
      setSymmetricDecryptionStatus(DecryptionState.IN_PROGRESS);
      setTimeout(() => {
        setSymmetricDecryptionStatus(DecryptionState.DONE);
        setSymmetricPlaintext("DUMMY_SYMMETRIC_PLAINTEXT");
        setFinalCipher("DUMMY_FINAL_PLAINTEXT");
      }, 3000);
    }, 3000);
  }

  useEffect(() => {
    console.log("Symmetric Encryption Status", symmetricDecryptionStatus);
    console.log("Spiral Encryption Status", spiralDecryptionStatus);
  }, [symmetricDecryptionStatus, spiralDecryptionStatus]);

  useEffect(() => {
    setSymmetricDecryptionStatus(DecryptionState.IDLE);
    setSpiralDecryptionStatus(DecryptionState.IDLE);
    setFinalCipher("");
  }, [ciphertext]);

  return (
    <div>
      <Box
        sx={{
          overflow: "auto",
          mt: 5,
          ml: 5,
          mr: 5,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          className="jersey-15"
          sx={{
            textAlign: "center",
            mb: 1,
          }}
        >
          Cipher Text
        </Typography>
        <TextareaAutosize
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          disabled={
            symmetricDecryptionStatus !== DecryptionState.IDLE ||
            spiralDecryptionStatus !== DecryptionState.IDLE
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              ciphertext.trim() !== "" &&
              key1.trim() !== "" &&
              key2.trim() !== ""
            ) {
              handleDecrypt();
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
            borderRadius: 5,
          }}
        />
        <Typography
          variant="h6"
          className="jersey-15"
          sx={{
            textAlign: "center",
            mb: 1,
            mt: 2,
          }}
        >
          Key 1
        </Typography>
        <TextareaAutosize
          value={key1}
          onChange={(e) => setKey1(e.target.value)}
          disabled={
            symmetricDecryptionStatus !== DecryptionState.IDLE ||
            spiralDecryptionStatus !== DecryptionState.IDLE
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              ciphertext.trim() !== "" &&
              key1.trim() !== "" &&
              key2.trim() !== ""
            ) {
              handleDecrypt();
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
            borderRadius: 5,
          }}
        />
        <Typography
          variant="h6"
          className="jersey-15"
          sx={{
            textAlign: "center",
            mb: 1,
            mt: 2,
          }}
        >
          Key 2
        </Typography>
        <TextareaAutosize
          value={key2}
          onChange={(e) => setKey2(e.target.value)}
          disabled={
            symmetricDecryptionStatus !== DecryptionState.IDLE ||
            spiralDecryptionStatus !== DecryptionState.IDLE
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              ciphertext.trim() !== "" &&
              key1.trim() !== "" &&
              key2.trim() !== ""
            ) {
              handleDecrypt();
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
            borderRadius: 5,
          }}
        />
        <Button
          variant="contained"
          startIcon={<LockIcon />}
          onClick={() => {
            handleDecrypt();
          }}
          disabled={
            !ciphertext.trim() ||
            !key1.trim() ||
            !key2.trim() ||
            symmetricDecryptionStatus !== DecryptionState.IDLE ||
            spiralDecryptionStatus !== DecryptionState.IDLE
          }
          sx={{
            background: "#8d5380",
            mt: 3,
            "&:hover": {
              background: "#fa9c2f",
            },
          }}
        >
          <Typography variant="body" className="jersey-15">
            Decrypt
          </Typography>
        </Button>
      </Box>
      <Box
        ref={spiralCipherRef}
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: 5,
        }}
      >
        {spiralDecryptionStatus === DecryptionState.IN_PROGRESS && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              className="jersey-15"
              sx={{ color: "#fff", mr: 1 }}
            >
              Spiral Decryption
            </Typography>
            <CircularProgress sx={{ color: "#fa9c2f" }} size="20px" />
          </Box>
        )}
        {spiralDecryptionStatus === DecryptionState.DONE && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              height: "200px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                className="jersey-15"
                sx={{ color: "#fff", mr: 1 }}
              >
                Spiral Decryption
              </Typography>
              <CheckCircleIcon sx={{ color: "#fa9c2f" }} fontSize="small" />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                padding: 3,
                borderRadius: 5,
                border: "1px solid #6c6c74",
                overflow: "scroll",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body"
                sx={{
                  color: "#6c6c74",
                  height: "100%",
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {spiralPlaintext}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        ref={symmetricCipherRef}
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: 5,
        }}
      >
        {spiralDecryptionStatus === DecryptionState.DONE &&
          symmetricDecryptionStatus === DecryptionState.IN_PROGRESS && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                className="jersey-15"
                sx={{ color: "#fff", mr: 1 }}
              >
                Symmetric Decryption
              </Typography>
              <CircularProgress sx={{ color: "#fa9c2f" }} size="20px" />
            </Box>
          )}

        {symmetricDecryptionStatus === DecryptionState.DONE && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
              height: "200px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                className="jersey-15"
                sx={{ color: "#fff", mr: 1 }}
              >
                Symmetric Decryption
              </Typography>
              <CheckCircleIcon sx={{ color: "#fa9c2f" }} fontSize="small" />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: 5,
                borderRadius: 5,
                border: "1px solid #6c6c74",
                overflow: "scroll",
              }}
            >
              <Typography
                variant="body"
                sx={{
                  color: "#6c6c74",
                  height: "100%",
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {symmetricPlaintext}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        {symmetricDecryptionStatus === DecryptionState.DONE &&
          spiralDecryptionStatus === DecryptionState.DONE && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mb: 5,
                }}
              >
                <Typography
                  variant="h6"
                  className="jersey-15"
                  sx={{
                    textAlign: "center",
                    mb: 1,
                    mr: 1,
                  }}
                >
                  Deciphered Plain Text =
                </Typography>
                <TextareaAutosize
                  value={finalCipher}
                  disabled
                  maxRows={3}
                  style={{
                    flex: 1,
                    overflow: "auto",
                    color: "#6c6c74",
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #6c6c74",
                    padding: 10,
                    minWidth: "50vw",
                    borderRadius: 5,
                  }}
                />
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(finalCipher);
                    setPlaintextCopied(true);
                    setTimeout(() => setPlaintextCopied(false), 3000);
                  }}
                  sx={{ marginLeft: 1, color: "#fff" }}
                >
                  {plaintextCopied ? <CheckCircleIcon /> : <FileCopyIcon />}
                </IconButton>
              </Box>
            </Box>
          )}
      </Box>
    </div>
  );
}
