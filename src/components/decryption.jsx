"use client";
import { Typography, TextareaAutosize, Box, Button } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "../app/globals.css";
import { useState, useEffect, useRef } from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import { SpiralMatrixDecryption } from "@/services/spiralMatrixCipher";
import { CeaserCipherDecryption } from "@/services/ceaserCipher";

export default function Decryption() {
  const [ciphertext, setCiphertext] = useState("");
  const [spiralPlaintext, setSpiralPlaintext] = useState("");
  const [symmetricPlaintext, setSymmetricPlaintext] = useState("");
  const [finalCipher, setFinalCipher] = useState("");
  const [spiralKey, setSpiralKey] = useState("");
  const [symmetricKey, setSymmetricKey] = useState("");

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

  const pasteValue = async (setInputValue) => {
    const text = await navigator.clipboard.readText();
    setInputValue(text);
  };

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

  // const handleDecrypt = async () => {
  //   if (
  //     ciphertext.trim() === "" ||
  //     spiralKey.trim() === "" ||
  //     symmetricKey.trim() === ""
  //   ) {
  //     return;
  //   }
  //   setSpiralDecryptionStatus(DecryptionState.IN_PROGRESS);

  //   // Call the async spiral decryption service here
  //   let spiralDecryptionResult = SpiralMatrixDecryption(ciphertext, spiralKey);
  //   console.log(spiralDecryptionResult);
  //   // "DUMMY_SPIRAL_PLAINTEXT";
  //   setSpiralPlaintext(spiralDecryptionResult);
  //   setSpiralDecryptionStatus(DecryptionState.DONE);

  //   setSymmetricDecryptionStatus(DecryptionState.IN_PROGRESS);

  //   let [hashCode, length] = symmetricKey.split(",");
  //   hashCode = parseInt(hashCode);
  //   length = parseInt(length);

  //   // Call the async symmetric decryption service here
  //   let symmetricDecryptedText = CeaserCipherDecryption(
  //     spiralDecryptionResult,
  //     hashCode,
  //     length
  //   );
  //   setSymmetricPlaintext(symmetricDecryptedText);
  //   setSymmetricDecryptionStatus(DecryptionState.DONE);

  //   setFinalCipher(symmetricDecryptedText);
  // };

  // Spiral decryption function
  const handleSpiralDecryption = async () => {
    if (ciphertext.trim() === "" || spiralKey.trim() === "") {
      return;
    }
    setSpiralDecryptionStatus(DecryptionState.IN_PROGRESS);

    // Call the async spiral decryption service here
    let spiralDecryptionResult = await SpiralMatrixDecryption(
      ciphertext,
      spiralKey
    );

    setSpiralPlaintext(spiralDecryptionResult);
    setSpiralDecryptionStatus(DecryptionState.DONE);
  };

  // Symmetric decryption function
  const handleSymmetricDecryption = async () => {
    if (symmetricKey.trim() === "") {
      return;
    }
    setSymmetricDecryptionStatus(DecryptionState.IN_PROGRESS);

    let [hashCode, length] = symmetricKey.split(",");
    hashCode = parseInt(hashCode);
    length = parseInt(length);

    // Call the async symmetric decryption service here
    let symmetricDecryptedText = await CeaserCipherDecryption(
      spiralPlaintext, // Use the spiralPlaintext state here
      hashCode,
      length
    );
    setSymmetricPlaintext(symmetricDecryptedText);
    setSymmetricDecryptionStatus(DecryptionState.DONE);

    setFinalCipher(symmetricDecryptedText);
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
          Cipher Text
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextareaAutosize
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            disabled={symmetricDecryptionStatus !== DecryptionState.IDLE}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                ciphertext.trim() !== "" &&
                spiralKey.trim() !== ""
              ) {
                handleSpiralDecryption();
                e.preventDefault();
              }
            }}
            style={{
              flexGrow: 1,
              overflow: "auto",
              color: "#6c6c74",
              backgroundColor: "#1f1f1f",
              border: "1px solid #6c6c74",
              padding: 10,
              borderRadius: 5,
            }}
          />
          <IconButton onClick={() => pasteValue(setCiphertext)}>
            <ContentPasteIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          className="jersey-15"
          sx={{
            textAlign: "center",
            mb: 1,
            mt: 2,
          }}
        >
          Spiral Key
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextareaAutosize
            value={spiralKey}
            onChange={(e) => setSpiralKey(e.target.value)}
            disabled={symmetricDecryptionStatus !== DecryptionState.IDLE}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                ciphertext.trim() !== "" &&
                spiralKey.trim() !== ""
              ) {
                handleSpiralDecryption();
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
          <IconButton onClick={() => pasteValue(setSpiralKey)}>
            <ContentPasteIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          startIcon={<LockOpenIcon />}
          onClick={() => {
            handleSpiralDecryption();
          }}
          disabled={
            !ciphertext.trim() ||
            !spiralKey.trim() ||
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
            <Typography
              variant="h6"
              className="jersey-15"
              sx={{
                textAlign: "center",
                mb: 1,
                mt: 2,
              }}
            >
              Symmetric Key
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextareaAutosize
                value={symmetricKey}
                onChange={(e) => setSymmetricKey(e.target.value)}
                disabled={symmetricDecryptionStatus !== DecryptionState.IDLE}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    ciphertext.trim() !== "" &&
                    spiralKey.trim() !== "" &&
                    symmetricKey.trim() !== ""
                  ) {
                    handleSymmetricDecryption();
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
              <IconButton onClick={() => pasteValue(setSymmetricKey)}>
                <ContentPasteIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              onClick={() => {
                handleSymmetricDecryption();
              }}
              disabled={
                !ciphertext.trim() ||
                !spiralKey.trim() ||
                !symmetricKey.trim() ||
                symmetricDecryptionStatus !== DecryptionState.IDLE ||
                spiralDecryptionStatus !== DecryptionState.DONE
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
                Continue
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
      <Box
        ref={symmetricCipherRef}
        sx={{
          justifyContent: "center",
          display: "flex",
          mt: 10,
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
                  Plain Text =
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
