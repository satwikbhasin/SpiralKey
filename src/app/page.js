import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "center",
            backgroundColor: "#702de0",
          }}
        >
          <Typography
            variant="h3"
            color="inherit"
            sx={{
              fontFamily: "'Jersey 15', sans-serif",
              fontWeight: "400",
              letterSpacing: "0.1em",
            }}
          >
            SpiralKey
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
