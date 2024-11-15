'use client';

import { createTheme } from '@mui/material/styles';
import { Anton } from 'next/font/google';

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: 'Anton, Arial, sans-serif',
    h1: {
      fontFamily: 'Anton, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: 'Anton, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '2.5rem',
    },
    button: {
      fontFamily: 'Anton, Arial, sans-serif',
      textTransform: 'none',
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: anton.style.fontFamily,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: anton.style.fontFamily,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default theme;
