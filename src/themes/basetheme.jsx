import { createTheme } from "@mui/material";
import "@fontsource/jersey-15";

const BaseTheme = createTheme({
  typography: {
    fontFamily: '"Jersey 15", sans-serif',
    fontWeight: 400,
    letterSpacing: "0.1em",
  },
});

export default BaseTheme;
