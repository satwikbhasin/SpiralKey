"use client"
import { ThemeProvider } from "@mui/material/styles";
import Base from "@/components/base";
import BaseTheme from "@/themes/basetheme";

export default function Home() {
  return (
    <ThemeProvider theme={BaseTheme}>
      <Base />
    </ThemeProvider>
  );
}
