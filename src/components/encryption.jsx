"use client";
import { Typography, TextareaAutosize, Box, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "../app/globals.css";
import { useState, useEffect, useRef } from "react";

import { CeaserCipherEncryption } from "@/services/ceaserCipher";
import { SpiralMatrixEncryption } from "@/services/spiralMatrixCipher";

export default function Encryption() {
  const [plaintext, setPlaintext] = useState("");
  const [symmetricCipher, setSymmetricCipher] = useState("");
  const [spiralCipher, setSpiralCipher] = useState("");
  const [finalCipher, setFinalCipher] = useState("");
  const [symmetricKey, setSymmetricKey] = useState([]);
  const [spiralKey, setSpiralKey] = useState([]);

  const [cipherCopied, setCipherCopied] = useState(false);
  const [key1Copied, setKey1Copied] = useState(false);
  const [key2Copied, setKey2Copied] = useState(false);

  const EncryptionState = {
    IDLE: "idle",
    IN_PROGRESS: "in-progress",
    DONE: "done",
  };
  const [symmetricEncryptionStatus, setSymmetricEncryptionStatus] = useState(
    EncryptionState.IDLE
  );
  const [spiralEncryptionStatus, setSpiralEncryptionStatus] = useState(
    EncryptionState.IDLE
  );

  const symmetricCipherRef = useRef(null);
  const spiralCipherRef = useRef(null);

  useEffect(() => {
    if (symmetricCipher && symmetricEncryptionStatus === EncryptionState.DONE) {
      symmetricCipherRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (spiralCipher && spiralEncryptionStatus === EncryptionState.DONE) {
      spiralCipherRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    symmetricCipher,
    spiralCipher,
    symmetricEncryptionStatus,
    spiralEncryptionStatus,
  ]);

  const handleEncrypt = async () => {
    if (plaintext.trim() === "") {
      return;
    }
    setSymmetricEncryptionStatus(EncryptionState.IN_PROGRESS);

    // Call the async symmetric encryption service here
    let symmetricEncryptionResult = await CeaserCipherEncryption(plaintext);
    // [
    //   "DUMMY_SYMMETRIC_CIPHER",
    //   "DUMMY_KEY_1",
    //   "DUMMY_KEY_2",
    // ];
    setSymmetricCipher(symmetricEncryptionResult.ciphertextC);
    setSymmetricKey([
      symmetricEncryptionResult.hashCode,
      symmetricEncryptionResult.length,
    ]);
    setSymmetricEncryptionStatus(EncryptionState.DONE);

    setSpiralEncryptionStatus(EncryptionState.IN_PROGRESS);

    // Call the async spiral encryption service here
    let spiralEncryptionResult = SpiralMatrixEncryption(
      symmetricEncryptionResult.ciphertextC
    );
    // "DUMMY_SPIRAL_CIPHER";
    setSpiralCipher(spiralEncryptionResult.ciphertextS);
    setSpiralKey(spiralEncryptionResult.keystring);
    setSpiralEncryptionStatus(EncryptionState.DONE);

    setFinalCipher(spiralEncryptionResult.ciphertextS);
  };

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
          Plain Text
        </Typography>
        <TextareaAutosize
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          disabled={
            symmetricEncryptionStatus !== EncryptionState.IDLE ||
            spiralEncryptionStatus !== EncryptionState.IDLE
          }
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
            borderRadius: 5,
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
            symmetricEncryptionStatus !== EncryptionState.IDLE ||
            spiralEncryptionStatus !== EncryptionState.IDLE
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
            Encrypt
          </Typography>
        </Button>
      </Box>
      <Box
        ref={symmetricCipherRef}
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: 5,
        }}
      >
        {symmetricEncryptionStatus === EncryptionState.IN_PROGRESS && (
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
              Symmetric Encryption
            </Typography>
            <CircularProgress sx={{ color: "#fa9c2f" }} size="20px" />
          </Box>
        )}

        {symmetricEncryptionStatus === EncryptionState.DONE && (
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
                Symmetric Encryption
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
                {symmetricCipher}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        ref={spiralCipherRef}
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: 5,
        }}
      >
        {spiralEncryptionStatus === EncryptionState.IN_PROGRESS && (
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
              Spiral Encryption
            </Typography>
            <CircularProgress sx={{ color: "#fa9c2f" }} size="20px" />
          </Box>
        )}
        {symmetricEncryptionStatus === EncryptionState.DONE &&
          spiralEncryptionStatus === EncryptionState.DONE && (
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
                  Spiral Encryption
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
                  {spiralCipher}
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
        {symmetricEncryptionStatus === EncryptionState.DONE &&
          spiralEncryptionStatus === EncryptionState.DONE && (
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
                  Cipher Text =
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
                    setCipherCopied(true);
                    setTimeout(() => setCipherCopied(false), 3000);
                  }}
                  sx={{ marginLeft: 1, color: "#fff" }}
                >
                  {cipherCopied ? <CheckCircleIcon /> : <FileCopyIcon />}
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  mb: 5,
                }}
              >
                <Tooltip
                  sx={{ fontSize: "15px", mr: 1 }}
                  title="Hashcode, Key Length"
                >
                  <InfoOutlinedIcon />
                </Tooltip>
                <Typography
                  variant="h6"
                  className="jersey-15"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Symmetric Key
                </Typography>
                <Typography
                  variant="h6"
                  className="jersey-15"
                  sx={{
                    textAlign: "center",
                    mr: 1,
                    ml: 1,
                  }}
                >
                  =
                </Typography>
                <TextareaAutosize
                  value={symmetricKey[0] + ", " + symmetricKey[1]}
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
                    navigator.clipboard.writeText(symmetricKey);
                    setKey1Copied(true);
                    setTimeout(() => setKey1Copied(false), 3000);
                  }}
                  sx={{ marginLeft: 1, color: "#fff" }}
                >
                  {key1Copied ? <CheckCircleIcon /> : <FileCopyIcon />}
                </IconButton>
              </Box>
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
                  Spiral Key =
                </Typography>
                <TextareaAutosize
                  value={spiralKey}
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
                    navigator.clipboard.writeText(spiralKey);
                    setKey2Copied(true);
                    setTimeout(() => setKey2Copied(false), 3000);
                  }}
                  sx={{ marginLeft: 1, color: "#fff" }}
                >
                  {key2Copied ? <CheckCircleIcon /> : <FileCopyIcon />}
                </IconButton>
              </Box>
            </Box>
          )}
      </Box>
    </div>
  );
}
